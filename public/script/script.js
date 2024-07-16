function getCurrentPage() {
  let path = window.location.pathname;
  path = path.replace(/^\/|\/$/g, "");

  const segments = path.split("/");
  const currentPage = segments.pop();

  return currentPage === "" ? "index" : currentPage;
}

document.addEventListener("DOMContentLoaded", () => {
  const currentPage = getCurrentPage();
  console.log(currentPage);
});
