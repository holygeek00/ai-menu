'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

export default function Home () {
  const [file, setFile] = useState(null)
  const [targetLanguage, setTargetLanguage] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [translatedText, setTranslatedText] = useState('')
  const [currentTitle, setCurrentTitle] = useState('AI Menu')
  const [userId, setUserId] = useState('')
  const [totalStats, setTotalStats] = useState([])

  useEffect(() => {
    let storedUserId = localStorage.getItem('userId')
    if (!storedUserId) {
      storedUserId = Math.random().toString(36).substr(2, 9)
      localStorage.setItem('userId', storedUserId)
    }
    setUserId(storedUserId)
  }, [])

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleLanguageChange = (e) => {
    setTargetLanguage(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', file)
    formData.append('target_language', targetLanguage)
    formData.append('user_id', userId)

    setIsLoading(true)
    setMessage('')
    setTranslatedText('')

    try {
      const response = await axios.post('https://bb.naassh.com/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setMessage('Upload successful!')
      setTranslatedText(response.data.translated_text)
      console.log(response.data)
    } catch (error) {
      setMessage('Upload failed!')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const fetchTotalStats = async () => {
      try {
        const response = await axios.get('https://bb.naassh.com/stats/total')
        setTotalStats(response.data.total_stats)
      } catch (error) {
        console.error('Error fetching total stats:', error)
      }
    }

    fetchTotalStats()

    let currentIndex = 0
    const intervalId = setInterval(() => {
      setCurrentTitle(titles[currentIndex])
      currentIndex = (currentIndex + 1) % titles.length
    }, 2000) // Change title every 2 seconds
    return () => clearInterval(intervalId)
  }, [])

  const languages = [
    { code: '中文', name: '中文' },
    { code: 'Español', name: 'Español' },
    { code: 'Français', name: 'Français' },
    { code: 'Deutsch', name: 'Deutsch' },
    { code: '日本語', name: '日本語' },
    { code: '한국어', name: '한국어' },
    { code: 'Русский', name: 'Русский' },
    { code: 'العربية', name: 'العربية' },
    { code: 'Português', name: 'Português' },
    { code: 'English', name: 'English' }
    // Add more languages as needed
  ]

  const titles = [
    'AI Menu',
    'AI菜单',
    'Menú de AI',
    'Menu AI',
    'AI-Menü',
    'AIメニュー',
    'AI 메뉴',
    'Меню AI',
    'قائمة AI',
    'Menu AI'
  ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <div className="max-w-md w-full bg-gradient-to-r from-gray-800 to-gray-900 p-6 md:p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl text-white md:text-3xl lg:text-4xl font-bold mb-6 text-center">{currentTitle}</h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="block">
            <span className="text-gray-300">Upload Image:</span>
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-200 focus:outline-none focus:ring focus:ring-gray-500"
              disabled={isLoading}
            />
          </label>
          <label className="block">
            <span className="text-gray-300">Target Language:</span>
            <select
              value={targetLanguage}
              onChange={handleLanguageChange}
              className="block w-full mt-1 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-500"
              disabled={isLoading}
            >
              <option value="">Select a language</option>
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-500"
            disabled={isLoading}
          >
            {isLoading ? 'Uploading...' : 'Submit'}
          </button>
          {message && <p className={`text-center mt-4 ${message.includes('successful') ? 'text-green-400' : 'text-red-400'}`}>{message}</p>}
        </form>

        {isLoading && (
          <div className="flex justify-center items-center mt-4">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
          </div>
        )}

        {translatedText && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-inner">
            <h2 className="text-xl text-blue-300 font-semibold mb-2">Translated Text:</h2>
            <ReactMarkdown className="prose text-white">{translatedText}</ReactMarkdown>
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-inner">
          <h2 className="text-xl text-blue-300 font-semibold mb-2">Total Usage Stats:</h2>
          <ul className="text-white">
            {totalStats.map((stat, index) => (
              <li key={index} className="mb-2">
                <div className="bg-gray-700 p-4 rounded-lg shadow">
                  <p><span className="font-semibold">Action:</span> {stat.action}</p>
                  <p><span className="font-semibold">Count:</span> {stat.count}</p>
                  <p><span className="font-semibold">First Use:</span> {new Date(stat.first_use).toLocaleString()}</p>
                  <p><span className="font-semibold">Last Use:</span> {new Date(stat.last_use).toLocaleString()}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4 text-center">
        <Link href="/about">
          <div className="text-blue-400 hover:underline">About Me</div>
        </Link>
      </div>
      <footer className="mt-8">
        <p className="text-gray-500 text-sm">© 2024 Naassh Ltd. All rights reserved.</p>
      </footer>
    </main>
  )
}
