import Link from 'next/link'
import Router from 'next/router'

function BreadCrumb({ paths }) {
    return (
        <div className="breadcrumb absolute right-0 top-0 w-full p-4 flex justify-content items-center">
            <div onClick={()=>Router.back()}><i className="far fa-angle-right text-white cursor-pointer px-2"></i></div>
            <span className="text-white mr-2">{paths}</span>
            <Link href="/">
            <i className="fas fa-home mr-auto text-white text-lg"></i>
            </Link>
        </div>
    )
}

export default BreadCrumb
