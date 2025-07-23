"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "design", "computer-vision", "navigation"]

  const projects = [
    {
      id: 1,
      title: "Monocular Visual Odometry",
      category: "computer-vision",
      image: "/monocular.png?height=400&width=600",
      description: "Visual odometry was performed using a single camera view for each sequence in the KITTI dataset. The FAST feature detector was used, and since it is a corner-based method, the odometry results were more accurate in sequences where the car drives through streets with many houses, compared to clearer, less structured areas.",
      technologies: ["OpenCV", "C++", "Computer Vision"],
      url: "https://github.com/Alvaro2304/monocular"
    },
    {
      id: 2,
      title: "Navigation Sandbox TurtleBot 4",
      category: "navigation",
      image: "/turtle4.png?height=400&width=600",
      description: "I developed a TurtleBot4 package in ROS 2 Humble for localization, SLAM, and navigation. Since the simulation package lacked an IMU plugin for Gazebo, I implemented one and integrated IMU measurements with odometry using an Extended Kalman Filter (EKF). I then mapped the environment with SLAM Toolbox, and finally, using Nav2, I created a YAML configuration file for the global planner, controller, and both the global and local costmaps.",
      technologies: ["ROS 2", "Nav2", "Gazebo", "EKF"],
      url: "https://github.com/Alvaro2304/turtlebot4_path_planning"
    },
    {
      id: 3,
      title: "Capstone Project UTEC × Purdue",
      category: "design",
      image: "/capstone.jpeg?height=400&width=600",
      description: "In collaboration with four students from Purdue University, my three teammates from UTEC and I built a beach waste collection robot equipped with tracked wheels. We successfully tested it on a Peruvian beach, where it was able to collect various types of waste. I contributed primarily to the mechanical design of the robot.",
      technologies: ["Mechanical Design", "Tracked wheels", "Collaboration"],
      url: "https://polytechnic.purdue.edu/capstone-project/utec-x-purdue-beach-cleaning-robot"
    },
    {
      id: 4,
      title: "Beach Waste Collector Prototype",
      category: "design",
      image: "/thesis_1.png?height=400&width=600",
      description: "For my Bachelor's thesis, my friend Marko and I built a prototype of a beach waste-collecting robot. This was the most challenging project I’ve worked on, as it was my first time designing a robot entirely from scratch. It made me realize just how demanding mechanical design can be. I implemented an Extended Kalman Filter (EKF) that fused GPS and IMU data, and for path following, we used two PD controllers to manage linear and angular velocities.",
      technologies: ["EKF", "GPS", "IMU", "Path Planning"],
      url: "https://drive.google.com/file/d/1kQcgincoPMevui0MTPidfnoNxSX_zIJr/view?usp=sharing"
    },
  ]

  const filteredProjects = projects.filter((project) =>
    selectedCategory === "all" ? true : project.category === selectedCategory,
  )

  return (
    <section id="projects" className="bg-black py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Projects
        </motion.h2>

        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="text-sm capitalize"
            >
              {category.replace("-", " ")}
            </Button>
          ))}
        </div>

        <motion.div layout className="grid gap-8 sm:grid-cols-2">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <Card className="overflow-hidden bg-zinc-900 h-full cursor-pointer hover:ring-2 hover:ring-primary transition">
                    <CardContent className="p-0">
                      <div className="group relative">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="p-6">
                          <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                          <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                              <span key={index} className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
