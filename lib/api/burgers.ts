import type { Burger } from "@/lib/types/burger";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

type BurgerResponse = {
  message: string;
  burger: Burger;
};

type BurgersResponse = {
  burgers: Burger[];
};

function getApiUrl(path: string) {
  if (!API_BASE_URL) {
    throw new Error(
      "NEXT_PUBLIC_API_URL is not configured"
    );
  }

  return `${API_BASE_URL}${path}`;
}

async function readResponse<T>(
  response: Response
): Promise<T> {
  const data = await response
    .json()
    .catch(() => null);

  if (!response.ok) {
    const message =
      data &&
      typeof data === "object" &&
      "message" in data &&
      typeof data.message === "string"
        ? data.message
        : `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return data as T;
}

export async function getBurgers(): Promise<
  Burger[]
> {
  const response = await fetch(
    getApiUrl("/api/burgers"),
    {
      credentials: "include",
      cache: "no-store",
    }
  );

  const data =
    await readResponse<BurgersResponse>(
      response
    );

  return data.burgers;
}

export async function getBurger(
  id: number
): Promise<Burger> {
  const response = await fetch(
    getApiUrl(`/api/burgers/${id}`),
    {
      credentials: "include",
      cache: "no-store",
    }
  );

  const data =
    await readResponse<BurgerResponse>(
      response
    );

  return data.burger;
}

export async function createBurger(
  formData: FormData
): Promise<BurgerResponse> {
  const response = await fetch(
    getApiUrl("/api/burgers"),
    {
      method: "POST",
      credentials: "include",
      body: formData,
    }
  );

  return readResponse<BurgerResponse>(
    response
  );
}

export async function updateBurger(
  id: number,
  formData: FormData
): Promise<BurgerResponse> {
  const response = await fetch(
    getApiUrl(`/api/burgers/${id}`),
    {
      method: "PATCH",
      credentials: "include",
      body: formData,
    }
  );

  return readResponse<BurgerResponse>(
    response
  );
}

export async function deleteBurger(
  id: number
): Promise<{ message: string }> {
  const response = await fetch(
    getApiUrl(`/api/burgers/${id}`),
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  return readResponse<{
    message: string;
  }>(response);
}