import { Link } from "react-router"

const Breadcrumbs = ({
    items
}: {
    items: {
        id: number
        label: string
        path: string
    }[]
}) => {
    return (
        <div className="flex items-center gap-2 mb-8">
            {items.map((item, index) => (
                <span key={item.id} className="font-bold">
                    <Link to={item.path} className="hover:text-brand-orange-500 transition-colors">
                        {item.label}
                    </Link>
                    {index < items.length - 1 && <span className="mx-2">&gt;</span>}
                </span>
            ))}
        </div>
    )
}

export default Breadcrumbs