import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, GraduationCap, Building2, ArrowLeft } from 'lucide-react';
import Header from '../../_components/Header';
import Footer from '../../_components/Footer';
import { fetchPublicProfile, fetchUserThesesCount } from '@/lib/api-profile';
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { notFound } from 'next/navigation';

export default async function AuthorBioPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  let profile;

  try {
    profile = await fetchPublicProfile(id);
  } catch {
    notFound();
  }

  if (!profile) {
    notFound();
  }

  const thesesCount = await fetchUserThesesCount(profile.prf_name);

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-gray-900 dark:to-gray-950">
      <div className="pointer-events-none fixed inset-0 h-screen w-screen opacity-30 dark:opacity-40">
        <AnimatedGridPattern
          width={50}
          height={50}
          className="h-full w-full fill-black/15 text-black/25 dark:fill-white/10 dark:text-white/20"
          numSquares={100}
          maxOpacity={0.4}
          duration={5}
        />
      </div>

      <Header />

      <main className="flex-1 p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link
              href="/home"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Authors
            </Link>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 lg:p-8 mb-6">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
              <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg flex-shrink-0">
                <Image
                  src={profile.prf_image_url || '/profile_placeholder.png'}
                  alt={`Profile picture of ${profile.prf_name}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-2">
                  {profile.prf_name}
                </h1>
                
                {profile.prf_affiliation && (
                  <p className="text-lg text-blue-600 dark:text-blue-400 mb-4">
                    {profile.prf_affiliation}
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
                  {profile.prf_email && (
                    <div className="flex items-center justify-center lg:justify-start">
                      <Mail className="w-4 h-4 mr-2 text-blue-500" />
                      <span>{profile.prf_email}</span>
                    </div>
                  )}
                  
                  {profile.prf_department && (
                    <div className="flex items-center justify-center lg:justify-start">
                      <Building2 className="w-4 h-4 mr-2 text-blue-500" />
                      <span>{profile.prf_department}</span>
                    </div>
                  )}
                  
                  {profile.prf_degree_program && (
                    <div className="flex items-center justify-center lg:justify-start">
                      <GraduationCap className="w-4 h-4 mr-2 text-blue-500" />
                      <span>{profile.prf_degree_program}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-center lg:justify-start">
                    <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                    <span>{thesesCount} Published Works</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
           {profile.prf_author_bio && (
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 lg:p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 pb-2 border-b-2 border-blue-200 dark:border-blue-700">
                About {profile.prf_name.split(' ')[0]}
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {profile.prf_author_bio}
                </p>
              </div>
            </div>
          )}

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 pb-2 border-b-2 border-blue-200 dark:border-blue-700">
              Academic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.prf_affiliation && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Position</h3>
                  <p className="text-gray-700 dark:text-gray-300">{profile.prf_affiliation}</p>
                </div>
              )}
              
              {profile.prf_department && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Department</h3>
                  <p className="text-gray-700 dark:text-gray-300">{profile.prf_department}</p>
                </div>
              )}
              
              {profile.prf_degree_program && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Program</h3>
                  <p className="text-gray-700 dark:text-gray-300">{profile.prf_degree_program}</p>
                </div>
              )}
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Publications</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {thesesCount} {thesesCount === 1 ? 'thesis' : 'theses'} in repository
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
