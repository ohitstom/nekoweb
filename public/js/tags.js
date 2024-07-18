console.log("parsing markdown");
const markdownTags = document.querySelectorAll("markdown");
markdownTags.forEach(tag => {
	console.log(tag.innerHTML.trim());
	tag.innerHTML = marked.parse(tag.innerHTML.trim());
	tag.setAttribute("loaded", "");
});
