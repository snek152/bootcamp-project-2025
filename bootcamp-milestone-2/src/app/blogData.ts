export interface Blog {
  title: string;
  date: string;
  description: string;
  image: string;
  imageAlt: string;
  slug: string;
}

const blogs: Blog[] = [
  {
    title: "How to Build a React Application in 2024",
    date: "2024-09-15",
    description:
      "A practical guide to building a modern React application with best practices and tooling.",
    image: "./images/react-guide.png",
    imageAlt: "Cover image for React guide",
    slug: "how-to-build-a-react-application-in-2024",
  },
  {
    title: "Designing Accessible UIs: A Practical Approach",
    date: "2024-11-02",
    description:
      "Tips and patterns for creating web interfaces that are accessible to everyone.",
    image: "./images/accessibility.png",
    imageAlt: "Accessibility illustration",
    slug: "designing-accessible-uis-a-practical-approach",
  },
];

export default blogs;
