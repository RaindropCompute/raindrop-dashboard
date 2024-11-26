export interface VideoDetail {
  id: string;
  uploadTime: string;
  status: "PENDING" | "UPLOADED" | "IN_PROGRESS" | "FINISHED" | "ERROR";
  error: string | null;
  uploadedBy: {
    id: string;
    fullName: string | null;
    email: string | null;
  };
  title: string;
  metadata: {
    duration: number;
    bitrate: number;
    width: number;
    height: number;
    framerate: number;
    audioSampleRate: number;
  } | null;
}

export interface Video {
  id: string;
  uploadTime: string;
  status: "PENDING" | "UPLOADED" | "IN_PROGRESS" | "FINISHED" | "ERROR";
  metadata: {
    duration: number;
  } | null;
  title: string;
}

export interface UploadedVideo {
  id: string;
  uploadUrl?: string;
}

export interface VideoRequest {
  url?: string;
  title: string | null;
}

export class RaindropClient {
  token: string | (() => Promise<string>);
  baseUrl: string;

  constructor({
    token,
    baseUrl,
  }: {
    token: string | (() => Promise<string>);
    baseUrl?: string;
  }) {
    this.token = token;
    this.baseUrl = baseUrl ?? "https://api-v1.raindrop.bobbygeorge.dev";
  }

  private async request<T = never, U = never>(
    method: string,
    route: string,
    data?: U
  ): Promise<T> {
    const token =
      typeof this.token === "function" ? await this.token() : this.token;
    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
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

    if (res.headers.get("content-type")?.split(";")[0] === "application/json") {
      const json: T = await res.json();
      return json;
    } else {
      return null as T;
    }
  }

  async getVideos() {
    return await this.request<Video[]>("GET", "/video");
  }

  async getVideo(videoId: string) {
    return await this.request<VideoDetail>(`GET`, `/video/${videoId}`);
  }

  async createVideo(video: VideoRequest) {
    return await this.request<UploadedVideo, VideoRequest>(
      "POST",
      "/video",
      video
    );
  }

  async uploadVideo({ file, ...video }: VideoRequest & { file: File }) {
    const result = await this.request<UploadedVideo, VideoRequest>(
      "POST",
      "/video",
      video
    );
    const token =
      typeof this.token === "function" ? await this.token() : this.token;

    const res = await fetch(new URL(result.uploadUrl!, this.baseUrl), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
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

  async deleteVideo(videoId: string) {
    return await this.request("DELETE", `/video/${videoId}`);
  }
}
