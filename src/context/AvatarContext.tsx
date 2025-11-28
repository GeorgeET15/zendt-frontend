import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { DEFAULT_AVATAR_URL } from "../constants/avatar";

const AvatarContext = createContext<string>(DEFAULT_AVATAR_URL);

type AvatarProviderProps = {
  children: ReactNode;
};

export function AvatarProvider({ children }: AvatarProviderProps) {
  const [avatarSrc, setAvatarSrc] = useState<string>(() => {
    const cached = sessionStorage.getItem("cachedAvatarDataUrl");
    return cached ?? DEFAULT_AVATAR_URL;
  });

  useEffect(() => {
    let cancelled = false;

    const cached = sessionStorage.getItem("cachedAvatarDataUrl");
    if (cached) {
      setAvatarSrc(cached);
      return;
    }

    const fetchAvatar = async () => {
      try {
        const response = await fetch(DEFAULT_AVATAR_URL, { cache: "force-cache" });
        if (!response.ok) return;
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          if (cancelled) return;
          const dataUrl = reader.result?.toString();
          if (!dataUrl) return;
          sessionStorage.setItem("cachedAvatarDataUrl", dataUrl);
          setAvatarSrc(dataUrl);
        };
        reader.readAsDataURL(blob);
      } catch {
        // fall back to remote URL
      }
    };

    fetchAvatar();

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => avatarSrc, [avatarSrc]);

  return <AvatarContext.Provider value={value}>{children}</AvatarContext.Provider>;
}

export function useAvatar() {
  return useContext(AvatarContext);
}
