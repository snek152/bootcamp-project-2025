var blogs = [
    {
        title: "How to Build a React Application in 2024",
        date: "2024-09-15",
        description: "A practical guide to building a modern React application with best practices and tooling.",
        image: "./images/react-guide.png",
        imageAlt: "Cover image for React guide",
        slug: "how-to-build-a-react-application-in-2024",
    },
    {
        title: "Designing Accessible UIs: A Practical Approach",
        date: "2024-11-02",
        description: "Tips and patterns for creating web interfaces that are accessible to everyone.",
        image: "./images/accessibility.png",
        imageAlt: "Accessibility illustration",
        slug: "designing-accessible-uis-a-practical-approach",
    },
];
function renderBlogs(items, containerId) {
    if (containerId === void 0) { containerId = "blog-container"; }
    var container = document.getElementById(containerId);
    if (!container) {
        console.warn("renderBlogs: container '#".concat(containerId, "' not found"));
        return;
    }
    container.innerHTML = "";
    items.forEach(function (blog) {
        var card = document.createElement("article");
        card.className = "blog-card";
        card.style.border = "1px solid #e5e7eb"; // tailwind gray-200
        card.style.borderRadius = "8px";
        card.style.padding = "16px";
        card.style.marginBottom = "16px";
        card.style.display = "flex";
        card.style.gap = "16px";
        card.style.alignItems = "flex-start";
        var img = document.createElement("img");
        img.src = blog.image;
        img.alt = blog.imageAlt;
        img.style.width = "160px";
        img.style.height = "auto";
        img.style.objectFit = "cover";
        img.style.borderRadius = "6px";
        var content = document.createElement("div");
        content.style.flex = "1";
        var h1 = document.createElement("h2");
        h1.textContent = blog.title;
        h1.style.margin = "0 0 8px 0";
        h1.style.fontSize = "1.25rem";
        var date = document.createElement("time");
        date.dateTime = blog.date;
        date.textContent = new Date(blog.date).toLocaleDateString();
        date.style.display = "block";
        date.style.color = "#6b7280"; // tailwind gray-500
        date.style.fontSize = "0.875rem";
        date.style.marginBottom = "8px";
        var p = document.createElement("p");
        p.textContent = blog.description;
        p.style.margin = "0";
        p.style.color = "#374151"; // tailwind gray-700
        var a = document.createElement("a");
        a.href = "/blogs/".concat(blog.slug, ".html"); // point to static blog page
        a.textContent = "Read more →";
        a.style.display = "inline-block";
        a.style.marginTop = "12px";
        a.style.color = "#0ea5e9"; // cyan-500
        a.style.textDecoration = "none";
        content.appendChild(h1);
        content.appendChild(date);
        content.appendChild(p);
        content.appendChild(a);
        card.appendChild(img);
        card.appendChild(content);
        container.appendChild(card);
    });
}
renderBlogs(blogs);
