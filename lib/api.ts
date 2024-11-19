export interface Video {
  id: string;
  title: string | null;
  length: string;
  createdAt: string;
}

export interface VideoRequest {
  url?: string;
  title: string | null;
}

export class RaindropClient {
  token: string;
  baseUrl: string;

  constructor({ token, baseUrl }: { token: string; baseUrl?: string }) {
    this.token = token;
    this.baseUrl = baseUrl ?? "https://api-v1.raindrop.bobbygeorge.dev";
  }

  private async request<T = never, U = never>(
    method: string,
    route: string,
    data?: U
  ): Promise<T> {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.token}`,
    };
    const init: RequestInit = { method, headers };
    if (data) {
      init.body = JSON.stringify(data);
      headers["Content-Type"] = "application/json";
    }
    const res = await fetch(new URL(route, this.baseUrl), init);

    if (!res.ok) {
      // TODO better error handling in api
      throw new Error(
        `Failed to fetch ${route}: ${res.status} - ${await res.text()}`
      );
    }

    if (res.body) {
      const json: T = await res.json();
      return json;
    } else {
      return null as T;
    }
  }

  async getVideos() {
    return await this.request<Video[]>("GET", "/video");
  }

  async createVideo(video: VideoRequest) {
    return await this.request<Video, VideoRequest>("POST", "/video", video);
  }

  async uploadVideo({ file, ...video }: VideoRequest & { file: File }) {
    const result = await this.request<
      Video & { uploadUrl: string },
      VideoRequest
    >("POST", "/video", video);

    const res = await fetch(new URL(result?.uploadUrl, this.baseUrl), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!res.ok) {
      // TODO better error handling in api
      throw new Error(`Failed to upload: ${res.status} - ${await res.text()}`);
    }

    return result;
  }
}
