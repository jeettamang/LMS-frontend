const Service = () => {
  return (
    <div className="grid md:grid-cols-3 gap-3 md:gap-8 md:max-w-6xl mx-auto">
      {[
        {
          title: "IT Training",
          desc: "Learn practical IT skills with real-world projects and expert instructors.",
        },
        {
          title: "Certification Preparation",
          desc: "Prepare for globally recognized certifications with structured guidance.",
        },
        {
          title: "Corporate Workshops",
          desc: "Upskill your team with customized corporate training programs.",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="border rounded-xl p-8 shadow hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
          <p className="text-gray-600">{item.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default Service;
