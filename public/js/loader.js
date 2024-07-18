// Startup
console.log("loader.js ran");

// Cache the current page to avoid recalculating it multiple times
const currentPage = getCurrentPage();

// Use async function to leverage promises for loading scripts
async function loadAllScripts() {
  // Load the current page's script first
  await loadScript(currentPage);

  // Load additional scripts if they exist for the current page
  if (additionalScripts[currentPage]) {
    const { scripts, sequential } = additionalScripts[currentPage];

    if (sequential) {
      // Load scripts sequentially
      for (const script in scripts) {
        if (scripts.hasOwnProperty(script)) {
          const defer =
            typeof scripts[script] === "object" && scripts[script].defer;
          await loadScript(script, defer);
        }
      }
    } else {
      // Load scripts concurrently
      const scriptPromises = [];
      for (const script in scripts) {
        if (scripts.hasOwnProperty(script)) {
          const defer =
            typeof scripts[script] === "object" && scripts[script].defer;
          scriptPromises.push(loadScript(script, defer));
        }
      }
      await Promise.all(scriptPromises);
    }
  }
}

// Function to get the current page from URL
function getCurrentPage() {
  let path = window.location.pathname.replace(/^\/|\/$/g, "");
  let segments = path.split("/");
  let currentPage = segments.pop();
  return currentPage === "" ? "index" : currentPage.replace(".html", "");
}

// Function to load a script dynamically and return a promise
function loadScript(filename, defer = false) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `/js/${filename}.js`;
    script.type = "module";
    if (defer) {
      script.defer = true;
    } else {
      script.async = true;
    }
    script.onload = () => {
      console.log(`Loaded script: ${filename}.js`);
      resolve();
    };
    script.onerror = (error) => {
      console.error(`Error loading script: ${filename}.js`, error);
      reject(error);
    };
    document.head.appendChild(script);
  });
}

// Define additional scripts to load based on specific page mappings
const additionalScripts = {
  test: {
    scripts: { marked: {}, tags: { defer: true } },
    sequential: true,
  },
};

// Start loading all scripts
loadAllScripts();
