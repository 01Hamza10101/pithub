import Link from "next/link";
import { format } from "date-fns";

const formatDate = (dateStr, formatStr = "MMM d") =>
  format(new Date(dateStr), formatStr);

function groupByMonth(data, dateKey) {
  const result = {};
  (Array.isArray(data) ? data : []).forEach((item) => {
    const date = new Date(item[dateKey]);
    const month = format(date, "MMMM yyyy");

    if (!result[month]) result[month] = [];
    result[month].push(item);
  });

  return result;
}


export default function ContributionActivity({ repositories = [], contributionrecords = [] }) {
  // Group repositories by creation month
  const reposByMonth = groupByMonth(repositories, "createdAt");

  // Group private contributions by month (if you want to)
  const contribByMonth = {};

  contributionrecords.forEach((record) => {
    const repo = repositories.find((r) => r.name === record.name);
    if (!repo) return;

    const month = format(new Date(repo.createdAt), "MMMM yyyy");
    const totalCommits = record.contributions.reduce((sum, c) => sum + c.count, 0);

    if (!contribByMonth[month]) contribByMonth[month] = 0;
    contribByMonth[month] += totalCommits;
  });

  // Merge all unique months
  const allMonths = Array.from(
    new Set([
      ...Object.keys(reposByMonth),
      ...Object.keys(contribByMonth),
    ])
  ).sort((a, b) => new Date(b) - new Date(a)); // newest first

  return (
    <div className="space-y-6">
      {allMonths.map((month) => (
        <div key={month} className="border-b border-b-gray-600 pb-4">
          <h3 className="text-lg  mb-2">{month}</h3>

          {/* Repository creations */}
          {reposByMonth[month]?.length > 0 && (
            <div className="mb-2">
              <p className="">
                {reposByMonth[month].length} {reposByMonth[month].length === 1 ? "repository" : "repositories"} created
              </p>
              <ul className="ml-4 mt-1 space-y-1 text-sm">
                {reposByMonth[month].map((repo, index) => (
                  <li key={index}>
                    <Link href={`/${repo.name}`} className="text-blue-600 hover:underline">
                      {repo.name}
                    </Link>{" "}
                    <span className="text-gray-500 text-xs">– {formatDate(repo.createdAt)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Private contributions */}
          {contribByMonth[month] > 0 && (
            <div>
              <p>
                {contribByMonth[month]} contribution{contribByMonth[month] > 1 ? "s" : ""} in private repositories
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
