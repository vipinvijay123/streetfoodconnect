import React from 'react';
import { Users, Linkedin, Mail, Phone, Award, Star } from 'lucide-react';

const TeamPage: React.FC = () => {
  const teamMembers = [
    {
      name: 'Vijaya Raghavan',
      role: 'Project Lead & Full Stack Developer',
      bio: 'Experienced in building scalable web applications with expertise in React, Node.js, and system architecture.',
      email: 'vijaya.raghavan@example.com',
      phone: '+91 98765 43210',
      linkedin: 'https://linkedin.com/in/vijayaraghavan',
      initials: 'VR',
      skills: ['React', 'Node.js', 'MongoDB', 'System Design']
    },
    {
      name: 'Shyam Kumar',
      role: 'Backend Developer & Database Architect',
      bio: 'Specializes in building robust APIs and designing efficient database schemas for high-performance applications.',
      email: 'shyam.kumar@example.com',
      phone: '+91 98765 43211',
      linkedin: 'https://linkedin.com/in/shyamkumar',
      initials: 'SK',
      skills: ['Python', 'PostgreSQL', 'Redis', 'API Design']
    },
    {
      name: 'Vipin Vijay',
      role: 'Frontend Developer & UI/UX Designer',
      bio: 'Creative developer focused on creating intuitive user interfaces and seamless user experiences.',
      email: 'vipin.vijay@example.com',
      phone: '+91 98765 43212',
      linkedin: 'https://linkedin.com/in/vipinvijay',
      initials: 'VV',
      skills: ['React', 'Tailwind CSS', 'Figma', 'Animation']
    },
    {
      name: 'Vasanth N',
      role: 'DevOps Engineer & Cloud Architect',
      bio: 'Expert in cloud infrastructure, CI/CD pipelines, and ensuring application scalability and reliability.',
      email: 'vasanth.n@example.com',
      phone: '+91 98765 43213',
      linkedin: 'https://linkedin.com/in/vasanthn',
      initials: 'VN',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD']
    },
    {
      name: 'Shanmuganathan',
      role: 'Mobile Developer & QA Engineer',
      bio: 'Dedicated to ensuring code quality and developing cross-platform mobile solutions for better user reach.',
      email: 'shanmuganathan@example.com',
      phone: '+91 98765 43214',
      linkedin: 'https://linkedin.com/in/shanmuganathan',
      initials: 'S',
      skills: ['React Native', 'Testing', 'Firebase', 'App Store']
    }
  ];

  const projectStats = [
    { label: 'Team Members', value: '5', icon: Users },
    { label: 'Years Experience', value: '25+', icon: Award },
    { label: 'Projects Completed', value: '50+', icon: Star },
    { label: 'Technologies Used', value: '15+', icon: Award }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Meet Our Team</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          We are a passionate team of developers dedicated to connecting street food vendors 
          with service providers through innovative technology solutions.
        </p>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {projectStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
                <Icon className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Team Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-32 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-orange-600">{member.initials}</span>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-orange-600 font-medium">{member.role}</p>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 text-center">{member.bio}</p>
              
              {/* Skills */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="flex justify-center space-x-4">
                <a
                  href={`mailto:${member.email}`}
                  className="text-gray-400 hover:text-orange-600 transition-colors"
                  title="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href={`tel:${member.phone}`}
                  className="text-gray-400 hover:text-orange-600 transition-colors"
                  title="Phone"
                >
                  <Phone className="w-5 h-5" />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-orange-600 transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Vision */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Revolutionizing Street Food Supply Chain
            </h3>
            <p className="text-gray-600 mb-4">
              Our platform bridges the gap between street food vendors and raw material suppliers, 
              creating an efficient ecosystem that benefits everyone involved. We leverage modern 
              technology to solve real-world problems in the food industry.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <Star className="w-4 h-4 text-orange-500 mr-2" />
                Streamlined order management system
              </li>
              <li className="flex items-center">
                <Star className="w-4 h-4 text-orange-500 mr-2" />
                Real-time inventory tracking
              </li>
              <li className="flex items-center">
                <Star className="w-4 h-4 text-orange-500 mr-2" />
                Mobile-first responsive design
              </li>
              <li className="flex items-center">
                <Star className="w-4 h-4 text-orange-500 mr-2" />
                Analytics and business insights
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Built with Passion</h4>
              <p className="text-sm text-gray-600">
                Every line of code is written with care to create a platform that truly serves 
                the street food community and helps small businesses thrive.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Technologies Used */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Technologies We Used
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB',
            'AWS', 'Docker', 'Git', 'Figma', 'Jest', 'Vite'
          ].map((tech, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-3 text-center hover:bg-orange-50 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700">{tech}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-orange-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Let's Connect!
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          We're always excited to discuss new projects, innovative ideas, or opportunities 
          to be part of your vision. Feel free to reach out to any of our team members.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:team@streetfoodconnect.com"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 transition-colors"
          >
            <Mail className="w-5 h-5 mr-2" />
            Email Our Team
          </a>
          <a
            href="tel:+919876543210"
            className="inline-flex items-center px-6 py-3 border border-orange-600 text-base font-medium rounded-md text-orange-600 bg-white hover:bg-orange-50 transition-colors"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;