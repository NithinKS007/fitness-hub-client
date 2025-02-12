import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

interface BreadcrumbProps {
  pathname: string;
}

const Breadcrumb = ({ pathname }: BreadcrumbProps) => {
  const pathnames = pathname.split('/').filter(Boolean);

  // Exclude the last segment from the links
  const segmentsForBreadcrumbs = pathnames.slice(0, pathnames.length - 1);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {/* The first link to the home */}
      <Link underline="hover" color="inherit" href="/">
        home
      </Link>

      {/* Generate links for each segment except the last one */}
      {segmentsForBreadcrumbs.map((value, index) => {
        const to = `/${segmentsForBreadcrumbs.slice(0, index + 1).join('/')}`;
        return (
          <Link key={to} underline="hover" color="inherit" href={to}>
            {value}
          </Link>
        );
      })}

      {/* The last segment is the active page, shown without a link */}
      <Link underline="hover" color="text.primary" aria-current="page">
        {pathnames[pathnames.length - 1]}
      </Link>
    </Breadcrumbs>
  );
}

export default Breadcrumb