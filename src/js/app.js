document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const returnTo = params.get("returnTo");

  const hasCookie = document.cookie
    .split(";")
    .some((item) => item.trim().startsWith("refreshToken="));

  if (!hasCookie) {
    try {
      const response = await fetch(
        "https://apis.erzen.xyz/v1/auth/arp-transfer?returnUrl=" + returnTo,
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
      } else if (response.status === 401) {
        const html = await response.text();
        document.write(html);
      }
    } catch (error) {
      console.error("Error authenticating with XENAuth:", error);
    }
  } else {
    window.location.href = returnTo;
  }
});
