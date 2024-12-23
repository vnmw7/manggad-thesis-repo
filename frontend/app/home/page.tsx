"use client";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import SideNav from "../_components/SideNav";

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />

      {/* Main Content with Sidebar under the banner */}
      <div className="ml-4 flex flex-1">
        <SideNav />

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Image Carousel */}
          <div className="mt-8 flex w-full justify-center rounded-lg">
            <div className="w-full max-w-7xl">
              <Carousel
                showThumbs={false}
                showArrows={false}
                autoPlay={true}
                infiniteLoop={true}
                interval={4000}
                showStatus={false}
                stopOnHover={false} // Optional: Keeps autoPlay running when hovered
                dynamicHeight={false}
              >
                <div>
                  <img
                    src="Galo.jpg"
                    alt="Carousel Image 1"
                    className="h-[300px] w-full rounded-lg object-fill"
                  />
                </div>
                <div>
                  <img
                    src="RizalEntrance.jpg"
                    alt="Carousel Image 2"
                    className="h-[300px] w-full rounded-lg object-fill"
                  />
                </div>
                <div>
                  <img
                    src="CollegeAtrium.jpg"
                    alt="Carousel Image 3"
                    className="h-[300px] w-full rounded-lg object-fill"
                  />
                </div>
                <div>
                  <img
                    src="SwimCenter.jpg"
                    alt="Carousel Image 4"
                    className="h-[300px] w-full rounded-lg object-fill"
                  />
                </div>
                <div>
                  <img
                    src="Amistad.jpg"
                    alt="Carousel Image 5"
                    className="h-[300px] w-full rounded-lg object-fill"
                  />
                </div>
              </Carousel>
            </div>
          </div>

          {/* First New Div Below the Carousel */}
          <div className="-ml-48 mt-8 flex w-full justify-center">
            <div className="max-w-4xl text-center">
              <h2 className="mb-2 text-left text-5xl font-bold text-[#0A379C]">
                The First Higher Education Institution in Negros Occidental
              </h2>
              <p className="max-full mt-5 text-justify text-xl text-gray-600">
                Dive deep into various disciplines and explore a wealth of
                knowledge contributed by our students and faculty. Our
                repository houses documents, research papers, and valuable
                resources curated for your academic and professional growth.
              </p>
            </div>
          </div>

          {/* Second New Div */}
          <div className="-ml-48 mt-8 flex w-full justify-center">
            <div className="max-w-4xl text-center">
              <h2 className="mb-2 text-left text-3xl font-bold text-[#0A379C]">
                Founded by the Augustinian Sisters of our Lady of Consolation
              </h2>
              <p className="mt-5 text-justify text-xl text-gray-600">
                La Consolacion College Bacolod was first established in 1919 by
                the Augustinian Sisters from Spain under the leadership of Mo.
                Rita Barcelo, OSA and Mo. Consuelo, OSA upon the invitation of a
                Catholic Bishop to put up a school in Bacolod City, now the
                capital of Negros Occidental, Philippines – one of the world’s
                top suppliers of sugar at that time.
              </p>
            </div>
          </div>

          {/* Third New Div */}
          <div className="-ml-48 mt-8 flex w-full justify-center">
            <div className="max-w-4xl text-center">
              <h2 className="mb-2 text-left text-3xl font-bold text-[#0A379C]">
                Pioneer in Education
              </h2>
              <p className="mt-5 text-justify text-xl text-gray-600">
                With a campus located at the center of Bacolod City, the first
                educational offerings of La Consolacion College Bacolod were
                primary and intermediate school certificates.
              </p>
            </div>
          </div>

          {/* Fourth New Div */}
          <div className="-ml-48 mt-8 flex w-full justify-center">
            <div className="max-w-4xl text-center">
              <h2 className="mb-2 text-left text-3xl font-bold text-[#0A379C]">
                School of Girls
              </h2>
              <p className="mt-5 text-justify text-xl text-gray-600">
                The first students of La Consolacion College Bacolod were girls
                from wealthy families of Negros Occidental until the 1960’s when
                the provincial economy was hit by a global crisis in the sugar
                industry, LCCB became co-educational and opened its doors to
                provide greater access to education for the poor – reinforcing
                its mission for evangelization through education.
              </p>
            </div>
          </div>

          {/* Fifth New Div */}
          <div className="-ml-48 mt-8 flex w-full justify-center">
            <div className="max-w-4xl text-center">
              <h2 className="mb-2 text-justify text-3xl font-bold text-[#0A379C]">
                Physical and Academic Advancement
              </h2>
              <p className="mt-5 text-justify text-xl text-gray-600">
                There was a rapid growth of student population as educational
                offerings and scholarship opportunities were increasingly
                offered. The college pioneered the offering of architecture,
                fine arts and interior design degree programs in addition to its
                teacher education and commerce degrees. It was followed by the
                offering of culinary, hospitality and tourism degree programs
                which were also the first of their kind in the province.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
