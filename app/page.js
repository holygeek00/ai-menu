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
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0)

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
      const response = await axios.post('https://bb.naassh.com/upload', formData, {
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
    { code: '中文', name: 'AI 菜单' },
    { code: 'Español', name: 'Menú AI' },
    { code: 'Français', name: 'Menu AI' },
    { code: 'Deutsch', name: 'AI-Menü' },
    { code: '日本語', name: 'AI メニュー' },
    { code: '한국어', name: 'AI 메뉴' },
    { code: 'Русский', name: 'AI Меню' },
    { code: 'العربية', name: 'قائمة الذكاء الاصطناعي' },
    { code: 'Português', name: 'Menu AI' },
    // Add more languages as needed
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLanguageIndex((prevIndex) => (prevIndex + 1) % languages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-r from-blue-100 to-blue-200 sm:p-24">
      <div className="max-w-md w-full bg-white p-6 sm:p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-blue-700">
          {languages[currentLanguageIndex].name}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="block">
            <span className="text-gray-700">Upload Image:</span>
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Target Language:</span>
            <select
              value={targetLanguage}
              onChange={handleLanguageChange}
              className="block w-full mt-1 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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
            <ReactMarkdown className="prose">{translatedText}</ReactMarkdown>
          </div>
        )}
      </div>
    </main>
  )
}
