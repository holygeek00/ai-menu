'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Naassh from '../../public/Naassh-icon.jpeg'

export default function About () {
  const [currentTitle, setCurrentTitle] = useState('About Me')

  const titles = [
    'About Me',
    '关于我',
    'Sobre mí',
    'À propos de moi',
    'Über mich',
    '私について',
    '저에 대해',
    'Обо мне',
    'عنّي',
    'Sobre mim'
  ]

  useEffect(() => {
    let currentIndex = 0
    const intervalId = setInterval(() => {
      setCurrentTitle(titles[currentIndex])
      currentIndex = (currentIndex + 1) % titles.length
    }, 2000) // Change title every 2 seconds
    return () => clearInterval(intervalId)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <div className="max-w-md w-full bg-gradient-to-r from-gray-800 to-gray-900 p-6 md:p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <Image src={Naassh} alt="Naassh Logo" width={100} height={100} className="rounded-full" />
        </div>
        <h1 className="text-2xl text-white md:text-3xl lg:text-4xl font-bold mb-6 text-center">{currentTitle}</h1>
        <div className="flex flex-col space-y-4 text-gray-300">
          <p>
            Hi there! I&apos;m Nash, hailing from a southern province of China. Currently, I&apos;m studying in Berlin, Germany, accompanied by my adorable cat, Tutu. 🐱
          </p>
          <p>
            I&apos;m not just an entrepreneur and a software engineer, but also a music lover, photography enthusiast, and a big fan of movies, reading, and traveling. 🎵📷🎬📚✈️
          </p>
          <p>
            I&apos;m very outgoing and friendly, and I love meeting new people! Let&apos;s connect and share our passions and experiences. 😊
          </p>
          <p>
            You can find me on Instagram: <a href="https://instagram.com/nash.liu.98" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">nash.liu.98</a>
          </p>
          <p>
            Or reach out via email: <a href="mailto:admin@naassh.com" className="text-blue-400 hover:underline">admin@naassh.com</a>
          </p>
        </div>
        <div className="flex justify-center mt-6">
          <Link href="/">
            <div className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-500">Back</div>
          </Link>
        </div>
      </div>
      <footer className="mt-8">
        <p className="text-gray-500 text-sm">© 2024 Naassh Ltd. All rights reserved.</p>
      </footer>
    </main>
  )
}
