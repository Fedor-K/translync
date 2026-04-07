export interface BlogCategory {
  id: string;
  name: string;
  description: string;
}

export const CATEGORIES: BlogCategory[] = [
  { id: "guides", name: "Guides", description: "How-to guides and tutorials" },
  { id: "comparisons", name: "Comparisons", description: "Product comparisons and alternatives" },
  { id: "use-cases", name: "Use Cases", description: "Real-world use cases and case studies" },
  { id: "industry", name: "Industry", description: "Industry trends and insights" },
  { id: "tips", name: "Tips", description: "Quick tips and best practices" },
];
