import { memo, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

// export type BreadcrumbType = { label: string; path: string };

const Breadcrumb = () => {
  const location = useLocation();

  const breadcrumbs = useMemo(() => {
    const formatSlugToTitle = (slug: string) => {
      if (!slug) return "";

      return slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };
    const pathParts = location.pathname.split("/").filter(Boolean);

    return pathParts.map((part, index) => {
      const url = "/" + pathParts.slice(0, index + 1).join("/");

      return {
        label: formatSlugToTitle(part),
        path: url,
      };
    });
  }, [location.pathname]);

  if (breadcrumbs.length === 0) return null;

  return (
    <nav className="flex flex-wrap font-medium transition-all px-4">
      <Link to={`/`} className="hover:text-blue-500">
        Home
      </Link>
      {breadcrumbs.map((item) => (
        <p key={item.path} className="ml-2 space-x-2">
          <span>/</span>
          <Link to={item.path} className="hover:text-blue-500">
            {item.label}
          </Link>
        </p>
      ))}
    </nav>
  );
};

export default memo(Breadcrumb);
