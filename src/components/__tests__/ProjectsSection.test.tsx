import { render, screen } from '@testing-library/react'
import ProjectsSection from '../ProjectsSection'

describe('ProjectsSection', () => {
  it('renders all project titles', () => {
    render(<ProjectsSection />)
    const titles = [
      'Confention',
      'Samklaang',
      'Helmdall',
      'Shopydoo',
      'Jarnkit',
      'ResearchBook'
    ]
    titles.forEach(title => {
      expect(screen.getByText(title)).toBeInTheDocument()
    })
  })
})
