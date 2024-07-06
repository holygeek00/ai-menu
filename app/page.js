'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

export default function Home () {
  const [file, setFile] = useState(null)
  const [targetLanguage, setTargetLanguage] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [translatedText, setTranslatedText] = useState('')
  const [currentTitle, setCurrentTitle] = useState('AI Menu')

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

  useEffect(() => {
    let currentIndex = 0
    const intervalId = setInterval(() => {
      setCurrentTitle(titles[currentIndex])
      currentIndex = (currentIndex + 1) % titles.length
    }, 2000) // Change title every 2 seconds
    return () => clearInterval(intervalId)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 md:p-8 rounded-lg shadow-md">
        <h1 className="text-2xl text-black md:text-3xl lg:text-4xl font-bold mb-6 text-center">{currentTitle}</h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="block">
            <span className="text-gray-700">Upload Image:</span>
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
              disabled={isLoading}
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Target Language:</span>
            <select
              value={targetLanguage}
              onChange={handleLanguageChange}
              className="block w-full mt-1 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
            disabled={isLoading}
          >
            {isLoading ? 'Uploading...' : 'Submit'}
          </button>
          {message && <p className={`text-center mt-4 ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
        </form>

        {isLoading && (
          <div className="flex justify-center items-center mt-4">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
          </div>
        )}

        {translatedText && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-inner">
            <h2 className="text-xl font-semibold mb-2">Translated Text:</h2>
            <ReactMarkdown className="prose text-black">{translatedText}</ReactMarkdown>
          </div>
        )}
      </div>
    </main>
  )
}
