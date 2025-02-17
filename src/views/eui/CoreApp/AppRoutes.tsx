import { useNavigate } from 'react-router-dom'
import WithSimpleContent from '@/views/eui/CoreApp/components/pages/overview/withSimpleContent'
import WithBasicCards from '@/views/eui/CoreApp/components/pages/overview/withBasicCards'
import WithTabCards from '@/views/eui/CoreApp/components/pages/overview/WithTabCards'
import WithTabbedContent from '@/views/eui/CoreApp/components/pages/overview/WithTabbedContent'

// Define an array of objects with keys, components, and metadata
export const contentItems = [
    { key: 'simple-content', component: WithSimpleContent, title: 'Simple' },
    { key: 'basic-cards', component: WithBasicCards, title: 'Basic Cards' },
    { key: 'tab-cards', component: WithTabCards, title: 'Tab Cards' },
    { key: 'tabbed-content', component: WithTabbedContent, title: 'Tabbed Content' },
]
