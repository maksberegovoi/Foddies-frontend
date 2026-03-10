import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '../pages/HomePage/HomePage.jsx'
import { NotFoundPage } from '../pages/NotFoundPage/NotFoundPage.jsx'
import { HOME_ROUTE } from '../constants/routes.js'

export const router = createBrowserRouter([
    {
        path: HOME_ROUTE,
        element: <HomePage />
    },
    {
        path: '*',
        element: <NotFoundPage />
    }
])
