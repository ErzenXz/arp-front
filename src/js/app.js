document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const returnTo = params.get("returnTo");

  const hasCookie = document.cookie
    .split(";")
    .some((item) => item.trim().startsWith("refreshToken="));

  if (!hasCookie) {
    try {
      const response = await fetch(
        "https://api.erzen.xyz/v1/auth/arp-transfer",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const html = await response.text();
        document.write(html);
      } else {
        window.location.href = returnTo + "?error=auth_failed";
      }
    } catch (error) {
      console.error("Error authenticating with XENAuth:", error);
    }
  } else {
    window.location.href = returnTo;
  }
});
