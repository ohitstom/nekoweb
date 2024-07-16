function getCurrentPage() {
  let path = window.location.pathname;
  path = path.replace(/^\/|\/$/g, "");

  const segments = path.split("/");
  const currentPage = segments.pop();

  return currentPage === "" ? "index" : currentPage;
}

function loadScript(filename) {
  const startTime = performance.now();
  const script = document.createElement("script");
  script.src = `${filename}.js`;
  script.async = true;
  script.onload = () => {
    const endTime = performance.now();
    console.log(
      `Loaded script: ${filename}.js in ${(endTime - startTime).toFixed(2)} ms`
    );
  };
  script.onerror = () => {
    const endTime = performance.now();
    console.error(
      `Failed to load script: ${filename}.js in ${(endTime - startTime).toFixed(
        2
      )} ms`
    );
  };
  document.head.appendChild(script);
}

// Immediately invoke function to start loading scripts as soon as possible
(function () {
  const currentPage = getCurrentPage();
  console.log(`Current page: ${currentPage}`);

  // Default script to load based on current page
  loadScript(currentPage);

  // Additional scripts to load based on specific page mappings
  const additionalScripts = {
    page1: ["extraScript1", "extraScript2"],
    page2: ["extraScript3"],
    // Add more page-specific scripts here
  };

  if (additionalScripts[currentPage]) {
    additionalScripts[currentPage].forEach((script) => loadScript(script));
  }
})();
