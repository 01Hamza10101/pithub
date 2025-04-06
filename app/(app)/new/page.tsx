'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FormData {
  name: string
  description: string
  visibility: 'public' | 'private'
  readme: boolean
  gitignore: boolean
  license: string
}

export default function NewRepositoryForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    visibility: 'public',
    readme: true,
    gitignore: false,
    license: 'none'
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
   <div className='flex justify-center p-3'>
    <form onSubmit={handleSubmit} className="w-[500px] mt-7 space-y-6">
      {/* Repository name */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <label htmlFor="name" className="block text-sm font-medium">
            Repository name
          </label>
          <span className="text-red-500">*</span>
        </div>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 bg-black focus:ring-blue-500"
          placeholder="my-awesome-project"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium">
          Description <span className="text-gray-500">(optional)</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 bg-black focus:ring-blue-500"
          placeholder="A short description of your repository"
        />
      </div>

      {/* Visibility */}
      <div className="space-y-4 border rounded-md p-4">
        <div className="flex items-center space-x-3">
          <input
            type="radio"
            id="public"
            name="visibility"
            value="public"
            checked={formData.visibility === 'public'}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 bg-black"
          />
          <label htmlFor="public" className="flex items-center space-x-2">
            <svg className="w-5 h-5" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
            </svg>
            <div>
              <span className="font-medium">Public</span>
              <p className="text-sm text-gray-500">Anyone on the internet can see this repository.</p>
            </div>
          </label>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="radio"
            id="private"
            name="visibility"
            value="private"
            checked={formData.visibility === 'private'}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600"
          />
          <label htmlFor="private" className="flex items-center space-x-2">
            <svg className="w-5 h-5" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M4 4v2h-.25A1.75 1.75 0 002 7.75v5.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-5.5A1.75 1.75 0 0012.25 6H12V4a4 4 0 10-8 0zm6.5 2V4a2.5 2.5 0 00-5 0v2h5zM12 7.5h.25a.25.25 0 01.25.25v5.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-5.5a.25.25 0 01.25-.25H12z"/>
            </svg>
            <div>
              <span className="font-medium">Private</span>
              <p className="text-sm text-gray-500">You choose who can see and commit to this repository.</p>
            </div>
          </label>
        </div>
      </div>

      {/* Initialize repository */}
      {/* <div className="space-y-4 border rounded-md p-4">
        <h3 className="font-medium">Initialize this repository with:</h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="readme"
              name="readme"
              checked={formData.readme}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label htmlFor="readme" className="text-sm">
              Add a README file
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="gitignore"
              name="gitignore"
              checked={formData.gitignore}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label htmlFor="gitignore" className="text-sm">
              Add .gitignore
            </label>
          </div>

          <div className="space-y-2">
            <label htmlFor="license" className="block text-sm">
              Choose a license
            </label>
            <select
              id="license"
              name="license"
              value={formData.license}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="none">None</option>
              <option value="mit">MIT License</option>
              <option value="apache">Apache License 2.0</option>
              <option value="gpl">GNU General Public License v3.0</option>
            </select>
          </div>
        </div>
      </div> */}

      {/* Submit button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Create repository
        </button>
      </div>

      {/* Learn more */}
      {/* <p className="text-sm text-gray-600">
        Learn more about{' '}
        <Link href="#" className="text-blue-600 hover:underline">
          repository visibility
        </Link>
        {' '}and{' '}
        <Link href="#" className="text-blue-600 hover:underline">
          licensing your repository
        </Link>
        .
      </p> */}
    </form>
  </div>
  )
}

