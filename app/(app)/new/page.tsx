'use client'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { CreateRepo } from '@/app/ReduxToolkit/ReduxSlice/User.Slice'
import { Plus } from 'lucide-react'

export default function NewRepositoryForm() {
  const [formData, setFormData] = useState<any>({
    name: '',
    description: '',
    status: 'public'
  })
  const [newRepo, setNewRepo] = useState(true)
  const [submitting, setSubmitting] = useState(false) // Track submission state
  const dispatch = useDispatch<any>()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (submitting) return // Prevent double submit

    setSubmitting(true) // Set submitting to true
    setNewRepo(false)

    dispatch(CreateRepo(formData))
      .unwrap()
      .then(() => {
        router.push('/overview')
        setNewRepo(true)
      })
      .catch((err: any) => {
        const errorMessage = err.message || 'Failed to create repository.'
        console.error(errorMessage)
      })
      .finally(() => {
        setSubmitting(false) // Reset submitting state
      })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <div className="flex justify-center px-4 py-6 sm:px-6 lg:px-8 bg-gray-900 min-h-screen text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl h-full space-y-8 border border-gray-700 p-6 rounded-xl bg-gray-800"
      >
        <h2 className="text-2xl font-bold text-white border-b border-gray-700 pb-2">
          <span className="text-green-500">+</span> Create New Repository
        </h2>

        {/* Repository Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-semibold">
            Repository name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="my-awesome-project"
            className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-400"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-semibold">
            Description <span className="text-gray-400">(optional)</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-400"
            placeholder="A short description of your repository"
          />
        </div>

        {/* Visibility */}
        <div className="space-y-4 border border-gray-700 rounded-md p-4">
          <h3 className="text-sm font-semibold">Visibility</h3>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="status"
              value="public"
              checked={formData.status === 'public'}
              onChange={handleChange}
              className="form-radio text-green-600"
            />
            <div>
              <span className="font-medium">Public</span>
              <p className="text-xs text-gray-400">Anyone on the internet can see this repository.</p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="status"
              value="private"
              checked={formData.status === 'private'}
              onChange={handleChange}
              className="form-radio text-green-600"
            />
            <div>
              <span className="font-medium">Private</span>
              <p className="text-xs text-gray-400">You choose who can see and commit to this repository.</p>
            </div>
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!formData.name || submitting} // Disable if submitting is true
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Plus size={16} />
            Create Repository
          </button>
        </div>
      </form>
    </div>
  )
}
