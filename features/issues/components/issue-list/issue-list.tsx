/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/router";
import styled from "styled-components";
import { useIssues } from "@features/issues";
import { ProjectLanguage, useProjects } from "@features/projects";
import { color, space, textFont } from "@styles/theme";
import { IssueRow } from "./issue-row";
import { Select } from "@features/ui/select";
import { useState } from "react";
import { Input } from "@features/ui/input";
import { Issue } from "@features/issues/types/issue.types";

const Container = styled.div`
  background: white;
  border: 1px solid ${color("gray", 200)};
  box-sizing: border-box;
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1),
    0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  border-radius: ${space(2)};
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const HeaderRow = styled.tr`
  border-bottom: 1px solid ${color("gray", 200)};
`;

const HeaderCell = styled.th`
  padding: ${space(3, 6)};
  text-align: left;
  color: ${color("gray", 500)};
  ${textFont("xs", "medium")};
`;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${space(4, 6)};
  border-top: 1px solid ${color("gray", 200)};
`;

const PaginationButton = styled.button`
  height: 38px;
  padding: ${space(0, 4)};
  background: white;
  border: 1px solid ${color("gray", 300)};
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 6px;

  &:not(:first-of-type) {
    margin-left: ${space(3)};
  }
`;

const PageInfo = styled.div`
  color: ${color("gray", 700)};
  ${textFont("sm", "regular")}
`;

const PageNumber = styled.span`
  ${textFont("sm", "medium")}
`;

export function IssueList() {
  const router = useRouter();

  const [filterSolved, setFilterSolved] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [search, setSearch] = useState("");

  const page = Number(router.query.page || 1);

  const navigateToPage = (newPage: number) =>
    router.push({
      pathname: router.pathname,
      query: { page: newPage },
    });

  const issuesPage = useIssues(page);
  const projects = useProjects();

  if (projects.isLoading || issuesPage.isLoading) {
    return <div>Loading</div>;
  }

  if (projects.isError) {
    console.error(projects.error);
    return <div>Error loading projects: {projects.error.message}</div>;
  }

  if (issuesPage.isError) {
    console.error(issuesPage.error);
    return <div>Error loading issues: {issuesPage.error.message}</div>;
  }

  const handleChange = (test: any) => {
    setFilterSolved(test);
    router.query.solved = test;

    if (test === "All") {
      removeQueryParamsFromRouter(router, ["solved"]);
    } else {
      router.push(router);
    }
    // router.push(router);
  };
  const handleChange1 = (test: any) => {
    setFilterLevel(test);
    router.query.level = test;

    if (test === "All") {
      removeQueryParamsFromRouter(router, ["level"]);
    } else {
      router.push(router);
    }
  };

  const handleChange2 = (test: any) => {
    setSearch(test);
    router.query.search = test;
    if (test === "") {
      removeQueryParamsFromRouter(router, ["search"]);
    } else {
      router.push(router);
    }
  };

  const projectIdToLanguage = (projects.data || []).reduce(
    (prev, project) => ({
      ...prev,
      [project.id]: project.language,
    }),
    {} as Record<string, ProjectLanguage>
  );

  const { items, meta } = issuesPage.data || {};

  const filteredItems = filterSolvedItems(items, filterSolved);
  const yay = filterLevelItems(filteredItems, filterLevel, router);

  const hj = filterSearch(yay, search);

  console.log(hj);

  return (
    <Container>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Select
          onChangee={(e: any) => handleChange(e)}
          options={["Unresolved", "Resolved"]}
          placeholder="Status"
        />
        <Select
          onChangee={(e: any) => handleChange1(e)}
          options={["Error", "Warning", "Info"]}
          placeholder="Level"
        />
        <Input
          icon="/icons/search.svg"
          placeholder="Project Name"
          onChangee={(e: any) => handleChange2(e)}
        />
      </div>

      <Table>
        <thead>
          <HeaderRow>
            <HeaderCell>Issue</HeaderCell>
            <HeaderCell>Level</HeaderCell>
            <HeaderCell>Events</HeaderCell>
            <HeaderCell>Users</HeaderCell>
          </HeaderRow>
        </thead>
        <tbody>
          {(hj || []).map((issue: any) => (
            <IssueRow
              key={issue.id}
              issue={issue}
              projectLanguage={projectIdToLanguage[issue.projectId]}
            />
          ))}
        </tbody>
      </Table>
      <PaginationContainer>
        <div>
          <PaginationButton
            onClick={() => navigateToPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </PaginationButton>
          <PaginationButton
            onClick={() => navigateToPage(page + 1)}
            disabled={page === meta?.totalPages}
          >
            Next
          </PaginationButton>
        </div>
        <PageInfo>
          Page <PageNumber>{meta?.currentPage}</PageNumber> of{" "}
          <PageNumber>{meta?.totalPages}</PageNumber>
        </PageInfo>
      </PaginationContainer>
    </Container>
  );
}

const filterSolvedItems = (items: any, filter: any) => {
  let test;

  if (filter === "Resolved") {
    test = items.filter((item: any) => item.status === "resolved");
  } else if (filter === "Unresolved") {
    test = items.filter((item: any) => item.status === "open");
  } else {
    return items;
  }

  return test;
};
const filterLevelItems = (items: any, filter: any, router: any) => {
  let test;

  // push({ query: { ...query, newParam: filter } }, undefined, {
  //   shallow: true,
  // });

  if (filter === "Error") {
    test = items.filter((item: any) => item.level === "error");
  } else if (filter === "Warning") {
    test = items.filter((item: any) => item.level === "warning");
  } else if (filter === "Info") {
    test = items.filter((item: any) => item.level === "info");
  } else {
    return items;
  }

  return test;
};

const filterSearch = (items: any, filter: any) => {
  let test;

  if (filter) {
    test = items.filter((item: Issue) => {
      return filter.toLowerCase() === ""
        ? item
        : item.name.toLowerCase().includes(filter.toLowerCase());
    });
  } else {
    return items;
  }

  return test;
};

const removeQueryParamsFromRouter = (
  router: any,
  removeList: string[] = []
) => {
  if (removeList.length > 0) {
    removeList.forEach((param) => delete router.query[param]);
  } else {
    // Remove all
    Object.keys(router.query).forEach((param) => delete router.query[param]);
  }
  router.replace(
    {
      pathname: router.pathname,
      query: router.query,
    },
    undefined,
    /**
     * Do not refresh the page
     */
    { shallow: true }
  );
};
