import Link from "next/link";
function Card({ category }) {
  return (
    <Link
      href="/categories/[id]"
      as={
        category.direct_children_count > 0
          ? `/categories/${category.id}`
          : `/market/${category.id}/products`
      }
    >
      <a className="shadow-md">
        <img
          className="w-full xs:h-40 md:h-48 object-cover object-center rounded-md rounded-b-none "
          src="/assets/images/3.jpg"
          alt="#"
        />
        <div className="xs:p-2 md:p-4 bg-white rounded-md rounded-t-none">
          <span className="text-gray-800 max-h-40">{category.name}</span>
        </div>
      </a>
    </Link>
  );
}

export default Card;
