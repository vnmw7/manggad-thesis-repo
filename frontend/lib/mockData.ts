// Mock data service for when Supabase is down
export interface Book {
  id: string;
  title: string;
  abstract: string;
  language: string;
  keywords: string | string[];
  degreeAwarded: number;
  authors: string | string[];
  advisors: string | string[];
  coverImage: string;
  department: string;
  program: string;
  recommendations: number;
  created_at: string;
}

export const mockBooks: Book[] = [
  {
    id: "1",
    title: "Digital Transformation in Higher Education: A Case Study of LCCB",
    abstract:
      "This study examines the impact of digital transformation on educational outcomes in higher education institutions, specifically focusing on La Concepcion College-Balamban. The research explores how technology integration affects student engagement, learning outcomes, and institutional efficiency.",
    language: "English",
    keywords: [
      "digital transformation",
      "higher education",
      "technology integration",
      "student engagement",
    ],
    degreeAwarded: 2024,
    authors: ["Maria Santos", "John Dela Cruz"],
    advisors: ["Dr. Ana Rodriguez", "Prof. Michael Garcia"],
    coverImage: "/defaults/defaultBookCover.png",
    department: "School of Business and Information Technology (SBIT)",
    program: "BS in Information Technology",
    recommendations: 15,
    created_at: "2024-05-15T10:30:00Z",
  },
  {
    id: "2",
    title:
      "Sustainable Tourism Practices in Cebu: Environmental and Economic Impact",
    abstract:
      "An analysis of sustainable tourism practices implemented in various tourist destinations across Cebu province, examining their environmental benefits and economic viability for local communities.",
    language: "English",
    keywords: [
      "sustainable tourism",
      "environmental impact",
      "economic development",
      "Cebu",
    ],
    degreeAwarded: 2024,
    authors: ["Jane Reyes", "Carlos Mendoza"],
    advisors: ["Dr. Patricia Lim", "Prof. Roberto Cruz"],
    coverImage: "/defaults/defaultBookCover.png",
    department: "School of Hospitality and Tourism Management (SHTM)",
    program: "BS in Tourism Management",
    recommendations: 12,
    created_at: "2024-04-20T14:15:00Z",
  },
  {
    id: "3",
    title:
      "Modern Filipino Architecture: Blending Traditional and Contemporary Design",
    abstract:
      "This thesis explores the evolution of Filipino architectural design, analyzing how contemporary architects incorporate traditional elements into modern structures while maintaining cultural identity and meeting current urban needs.",
    language: "English",
    keywords: [
      "Filipino architecture",
      "traditional design",
      "contemporary architecture",
      "cultural identity",
    ],
    degreeAwarded: 2023,
    authors: ["Miguel Torres", "Isabella Villareal"],
    advisors: ["Arch. Ricardo Fernandez", "Dr. Carmen Silva"],
    coverImage: "/defaults/defaultBookCover.png",
    department:
      "School of Architecture, Fine Arts, and Interior Design (SARFAID)",
    program: "BS in Architecture",
    recommendations: 20,
    created_at: "2023-12-10T09:45:00Z",
  },
  {
    id: "4",
    title:
      "Effective Teaching Strategies for English Language Learning in Rural Areas",
    abstract:
      "A comprehensive study on innovative teaching methodologies for English language acquisition in rural educational settings, focusing on resource constraints and community-based learning approaches.",
    language: "English",
    keywords: [
      "English language learning",
      "rural education",
      "teaching strategies",
      "community-based learning",
    ],
    degreeAwarded: 2023,
    authors: ["Sarah Johnson", "Mark Anthony Lopez"],
    advisors: ["Dr. Grace Tan", "Prof. David Ramos"],
    coverImage: "/defaults/defaultBookCover.png",
    department:
      "School of Sciences, Liberal Arts, and Teacher Education (SSLATE)",
    program: "BS in English",
    recommendations: 8,
    created_at: "2023-11-05T16:20:00Z",
  },
  {
    id: "5",
    title:
      "Hospitality Management Excellence: Customer Service Innovation in the Post-Pandemic Era",
    abstract:
      "An exploration of innovative customer service strategies in the hospitality industry, examining how businesses have adapted their service models to meet changing consumer expectations following the COVID-19 pandemic.",
    language: "English",
    keywords: [
      "hospitality management",
      "customer service",
      "post-pandemic",
      "service innovation",
    ],
    degreeAwarded: 2024,
    authors: ["Anna Marie Castro", "Luis Fernando Reyes"],
    advisors: ["Dr. Elena Morales", "Prof. Antonio Valdez"],
    coverImage: "/defaults/defaultBookCover.png",
    department: "School of Hospitality and Tourism Management (SHTM)",
    program: "BS in Hospitality Management",
    recommendations: 18,
    created_at: "2024-03-12T11:30:00Z",
  },
  {
    id: "6",
    title:
      "Mental Health Awareness and Support Systems in Philippine Universities",
    abstract:
      "This research investigates the current state of mental health support systems in Philippine higher education institutions, identifying gaps and proposing comprehensive intervention strategies for student wellbeing.",
    language: "English",
    keywords: [
      "mental health",
      "university students",
      "support systems",
      "psychological wellbeing",
    ],
    degreeAwarded: 2024,
    authors: ["Nicole Fernandez", "Jerome Pascual"],
    advisors: ["Dr. Margaret Santos", "Prof. Rafael Dela Rosa"],
    coverImage: "/defaults/defaultBookCover.png",
    department:
      "School of Sciences, Liberal Arts, and Teacher Education (SSLATE)",
    program: "BS in Psychology",
    recommendations: 25,
    created_at: "2024-02-28T13:45:00Z",
  },
];

// Mock API functions
export const mockGetAllBooks = async (): Promise<{
  success: boolean;
  data?: Book[];
  error?: string;
}> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    data: mockBooks,
  };
};

export const mockSearchBooks = async (params: {
  filterAndSearchQuery?: string;
  year?: number;
  departments?: string[];
  programs?: string[];
}): Promise<{ success: boolean; data?: Book[]; error?: string }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  let filteredBooks = [...mockBooks];

  // Filter by year
  if (params.year) {
    filteredBooks = filteredBooks.filter(
      (book) => book.degreeAwarded === params.year,
    );
  }

  // Filter by departments
  if (params.departments && params.departments.length > 0) {
    filteredBooks = filteredBooks.filter((book) =>
      params.departments!.some((dept) => book.department.includes(dept)),
    );
  }

  // Filter by programs
  if (params.programs && params.programs.length > 0) {
    filteredBooks = filteredBooks.filter((book) =>
      params.programs!.some((program) => book.program.includes(program)),
    );
  }
  // Text search
  if (params.filterAndSearchQuery) {
    const searchTerm = params.filterAndSearchQuery.toLowerCase();
    filteredBooks = filteredBooks.filter((book) => {
      // Convert keywords to array if it's a string
      const keywords = Array.isArray(book.keywords)
        ? book.keywords
        : book.keywords.split(",");
      // Convert authors to array if it's a string
      const authors = Array.isArray(book.authors)
        ? book.authors
        : book.authors.split(",");

      return (
        book.title.toLowerCase().includes(searchTerm) ||
        book.abstract.toLowerCase().includes(searchTerm) ||
        keywords.some((keyword: string) =>
          keyword.toLowerCase().includes(searchTerm),
        ) ||
        authors.some((author: string) =>
          author.toLowerCase().includes(searchTerm),
        )
      );
    });
  }

  return {
    success: true,
    data: filteredBooks,
  };
};

export const mockGetBookById = async (
  id: string,
): Promise<{ success: boolean; data?: Book; error?: string }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  const book = mockBooks.find((b) => b.id === id);

  if (!book) {
    return {
      success: false,
      error: "Book not found",
    };
  }

  return {
    success: true,
    data: book,
  };
};
