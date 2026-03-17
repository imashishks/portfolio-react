import { motion } from "motion/react";
import TabLayout from "../../components/TabLayout";
import Experience from "../WhoAmI/components/Experience";

function Contact() {
  const contactDetails = [
    {
      title: "email",
      value: "sayhitoak@gmail.com",
      callback: () => {
        window.open("mailto:sayhitoak@gmail.com");
      }
    },
    {
      title: "linkedin",
      value: "@ashishkumar0906",
      url: "https://www.linkedin.com/in/ashishkumar0906/"
    },
    {
      title: "github",
      value: "@imashishks",
      url: "https://github.com/imashishks"
    },
    {
      title: "twitter",
      value: "@sayhitoash",
      url: "https://x.com/sayhitoash"
    },
  ];
  const openLink = (url: string) => {
    window.open(url, "_blank");
  }
  return (
    <TabLayout>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.12,
            },
          },
        }}
        className=" mt-8 flex flex-col w-5/6 h-full"
      >

        <motion.h2 variants={{
          hidden: { opacity: 0, y: 16 },
          visible: { opacity: 1, y: 0 },
        }} 
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mt-8 text-4xl ">
          Don’t Hesitate to Reach Out !
        </motion.h2>
        <motion.p variants={{
          hidden: { opacity: 0, y: 16 },
          visible: { opacity: 1, y: 0 },
        }} 
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mt-8  text-sm">
          Let’s talk about UI/UX, art, problem solving, hobbies and life in general :)
        </motion.p>

        <motion.section className="mt-8 w-full">

          <motion.section
            className="grid grid-cols-2 gap-x-16 gap-y-4 max-w-4xl"
          >
            {contactDetails.map((details, index) => (
              <motion.div
                key={"contact_details" + index}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <p className="font-semibold  text-black">{details.title}</p>
                <p className="mt-1 text-sm text-neutral-500 flex gap-1 items-center cursor-pointer" onClick={() => details.callback ? details.callback() : openLink(details.url || "")}>
                  <span>{details.value}</span>
                  <span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"

                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 19L19 5M19 5H8M19 5V16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </p>

              </motion.div>
            ))}
          </motion.section>
        </motion.section>
      </motion.div>
    </TabLayout>
  );
}

export default Contact;
