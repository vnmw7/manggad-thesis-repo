import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

interface AuthorBioData {
  id: string;
  name: string;
  profileImage: string;
  currentRole: string;
  currentPosition?: string;
  education: {
    degree: string;
    university: string;
    graduationYear: string;
    scholarship?: string;
  };
  bioHighlights: string[];
  theses: Array<{ title: string; year: number; link: string }>;
  submissionDetails?: {
    author: string;
    gradeStream: string;
    date: string;
  };
}

const authorsMockData: { [key: string]: AuthorBioData } = {
  'henzeel-y-pis-o': {
    id: 'henzeel-y-pis-o',
    name: 'Henzeel Y. Pis-o',
    profileImage: 'https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1678886400/profile_images/henzeel-pis-o.jpg',
    currentRole: 'Information Technology Professional at Accenture Inc.',
    currentPosition: 'Vice-Manager',
    education: {
      degree: 'Bachelor of Science in Information Technology (BS IT)',
      university: 'University of the Cordilleras',
      graduationYear: 'May 2015',
      scholarship: 'Department of Science and Technology (DOST) Scholar (from 1st year to graduation)',
    },
    bioHighlights: [
      "During her university years, Henzeel was an active participant in various academic and co-curricular activities and organizations, not just within her department but across the entire university.",
      "As a student leader, she diligently balanced her studies with her responsibilities as a member and officer in several organizations.",
      "Being a DOST scholar, she maintained excellent academic performance to continue her scholarship.",
      "Beyond academics, she was also an active youth leader in her church, managing additional activities and responsibilities.",
      "These experiences honed her skills in time management, organization, and fulfilling responsibilities diligently.",
      "In her current role as a Vice-Manager at Accenture, she is one of the leaders in project execution, addressing client needs, and coordinating with her colleagues."
    ],
    theses: [],
    submissionDetails: {
        author: "Joanna Ally B. Pis-o",
        gradeStream: "12 STEM B",
        date: "November 3, 2022"
    }
  },
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const author = authorsMockData[params.id];

  if (!author) {
    return {
      title: 'Author Not Found | Thesis Repository',
    };
  }

  return {
    title: `${author.name} - Author Bio | Thesis Repository`,
    description: `Biography and works of ${author.name}, ${author.currentRole}.`,
  };
}

export default async function AuthorBioPage({ params }: { params: { id: string } }) {
  const authorId = params.id;
  const author = authorsMockData[authorId];

  if (!author) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Author Not Found</h1>
        <p className="text-xl text-gray-700 mb-8">
          The author profile you are looking for (ID: {authorId}) does not exist or could not be loaded.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          ← Back to Repository Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {author.submissionDetails && (
            <div className="max-w-3xl mx-auto mb-6 text-xs text-gray-500 flex justify-between items-start p-4 bg-white rounded-t-lg shadow">
                <div>
                    <p className="font-medium">{author.submissionDetails.author}</p>
                    <p>{author.submissionDetails.gradeStream}</p>
                </div>
                <p>{author.submissionDetails.date}</p>
            </div>
        )}

        <article className="max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded-lg shadow-xl">
          <header className="text-center mb-8 sm:mb-10 pb-6 border-b border-gray-200">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 shadow-lg rounded-full overflow-hidden border-4 border-blue-500">
              <Image
                src={author.profileImage}
                alt={`Profile picture of ${author.name}`}
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight">
              {author.name}
            </h1>
            <p className="text-lg sm:text-xl text-blue-600 mt-2">
              {author.currentRole}
            </p>
            {author.currentPosition && (
              <p className="text-md text-gray-500">{author.currentPosition}</p>
            )}
          </header>

          <section className="mb-8 sm:mb-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 pb-2 border-b-2 border-blue-200">
              Education
            </h2>
            <div className="bg-blue-50 p-4 sm:p-6 rounded-lg shadow-sm space-y-2 text-gray-700">
              <p>
                <strong className="font-medium">Degree:</strong> {author.education.degree}
              </p>
              <p>
                <strong className="font-medium">University:</strong> {author.education.university}
              </p>
              <p>
                <strong className="font-medium">Graduated:</strong> {author.education.graduationYear}
              </p>
              {author.education.scholarship && (
                <p>
                  <strong className="font-medium">Scholarship:</strong> {author.education.scholarship}
                </p>
              )}
            </div>
          </section>

          <section className="mb-8 sm:mb-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 pb-2 border-b-2 border-blue-200">
              About {author.name.split(' ')[0]}
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed prose prose-blue max-w-none">
              {author.bioHighlights.map((highlight, index) => (
                <p key={index}>{highlight}</p>
              ))}
            </div>
          </section>

          <section className="mb-8 sm:mb-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 pb-2 border-b-2 border-blue-200">
              Theses & Publications
            </h2>
            {author.theses.length > 0 ? (
              <ul className="list-disc list-inside space-y-3 pl-1 text-gray-700">
                {author.theses.map((thesis, index) => (
                  <li key={index} className="hover:text-blue-600 transition-colors">
                    <Link href={thesis.link} className="font-medium hover:underline">
                      {thesis.title}
                    </Link>
                    <span className="text-sm text-gray-500 ml-2">({thesis.year})</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 italic">
                No theses or publications are currently listed for this author in the repository.
              </p>
            )}
          </section>

          <nav className="mt-10 sm:mt-12 pt-8 border-t border-gray-200 text-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Repository Home
            </Link>
          </nav>
        </article>
      </div>
    </div>
  );
}