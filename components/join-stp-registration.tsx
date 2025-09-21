'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface JoinSTPRegistrationProps {
  onSubmit: (formData: FormData) => Promise<void>
  isSubmitting?: boolean
}

export function JoinSTPRegistration({ onSubmit, isSubmitting = false }: JoinSTPRegistrationProps) {
  const [selectedRole, setSelectedRole] = useState<string>('')
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    await onSubmit(formData)
  }

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">Join STP</CardTitle>
          <p className="text-gray-600 mt-2">Create your account to get started</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Role Selection - Simple Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-medium text-gray-700">
                I am a... <span className="text-red-500">*</span>
              </Label>
              <select
                id="role"
                name="role"
                value={selectedRole}
                onChange={handleRoleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select your role</option>
                <option value="Student">Student</option>
                <option value="Parent">Parent</option>
                <option value="Counselor">Counselor</option>
              </select>
            </div>

            {/* Basic Information */}
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="w-full"
                placeholder="Enter your first name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="w-full"
                placeholder="Enter your last name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="w-full"
                placeholder="Enter your email address"
              />
            </div>

            {/* Optional Phone Number for all roles */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone Number (optional)
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                className="w-full"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Counselor-specific fields */}
            {selectedRole === 'Counselor' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="institutionType" className="text-sm font-medium text-gray-700">
                    Institution Type <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="institutionType"
                    name="institutionType"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select institution type</option>
                    <option value="High School">High School</option>
                    <option value="Community College">Community College</option>
                    <option value="University">University</option>
                    <option value="Private College">Private College</option>
                    <option value="Trade School">Trade School</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="institutionName" className="text-sm font-medium text-gray-700">
                    Institution Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="institutionName"
                    name="institutionName"
                    type="text"
                    required
                    className="w-full"
                    placeholder="Enter your institution name"
                  />
                </div>
              </>
            )}

            {/* Parent-specific fields */}
            {selectedRole === 'Parent' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="studentEmail" className="text-sm font-medium text-gray-700">
                    Student's Email (optional)
                  </Label>
                  <Input
                    id="studentEmail"
                    name="studentEmail"
                    type="email"
                    className="w-full"
                    placeholder="Enter your student's email address"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    You can link to your student's account later if you prefer.
                  </p>
                </div>
              </>
            )}

            {/* Goal field - for Student and Parent only */}
            {(selectedRole === 'Student' || selectedRole === 'Parent') && (
              <div className="space-y-2">
                <Label htmlFor="goal" className="text-sm font-medium text-gray-700">
                  What do you hope to accomplish? (optional)
                </Label>
                <Input
                  id="goal"
                  name="goal"
                  type="text"
                  className="w-full"
                  placeholder="Tell us about your goals"
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}