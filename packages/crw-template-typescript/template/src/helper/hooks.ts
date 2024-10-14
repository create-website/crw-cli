import { useDispatch, useSelector } from 'react-redux'
import { createAsyncThunk } from '@reduxjs/toolkit'
import type { RootState, AppDispatch } from '@/framework/store'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export { unwrapResult } from '@reduxjs/toolkit'
export const createAppAsyncThunk = createAsyncThunk.withTypes<{ state: RootState; dispatch: AppDispatch }>()

export {
    redirect,
    useMatches,
    useNavigate,
    useLocation,
    Outlet,
    createBrowserRouter
} from 'react-router-dom'

export { useTranslation } from 'react-i18next'
