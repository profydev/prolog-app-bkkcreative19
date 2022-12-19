/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/router";
import styled from "styled-components";
import { useIssues } from "@features/issues";
import { ProjectLanguage, useProjects } from "@features/projects";
import { color, space, textFont } from "@styles/theme";
import { IssueRow } from "./issue-row";
import { Select } from "@features/ui/select";
import { useEffect, useState } from "react";
import { Input } from "@features/ui/input";
import { Issue } from "@features/issues/types/issue.types";
import capitalize from "lodash/capitalize";
import { Button2 } from "@features/ui";
import { SelectOption } from "@features/ui/select/select-option";

const Container = styled.div`
  background: white;
  border: 1px solid ${color("gray", 200)};
  box-sizing: border-box;
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1),
    0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  border-radius: ${space(2)};
  overflow: hidden;

  @media (max-width: 750px) {
    border: none;
    box-shadow: none;
  }
`;

const Table = styled.div`
  width: 100%;
  border-collapse: collapse;
  display: table;

  @media (max-width: 750px) {
    display: flex;
    flex-direction: column;
    border: none;
    box-shadow: none;
  }
`;

const HeaderRow = styled.tr`
  border-bottom: 1px solid ${color("gray", 200)};

  @media (max-width: 750px) {
    display: none;
  }
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

  @media (max-width: 750px) {
    display: none;
  }
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

const FilterStyles = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  justify-content: space-between;

  @media (max-width: 750px) {
    flex-direction: column;
    width: 100%;
  }
`;

const FilterYay = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 750px) {
    flex-direction: column;
    width: 100%;
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

  const [filterStatus, setFilterStatus] = useState(router.query["status"]);
  const [filterLevel, setFilterLevel] = useState(router.query["level"]);
  const [search, setSearch] = useState(router.query["search"]);

  const [query, setQuery] = useState<{
    status?: string;
    page?: number;
    search?: string;
    level?: string;
  }>({
    ...router.query,
  });

  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: query,
    });
  }, [query]);

  const page = Number(router.query.page || 1);

  const navigateToPage = (newPage: number) => {
    setQuery({ ...query, page: newPage });
    // router.push({
    //   pathname: router.pathname,
    //   query: { page: newPage },
    // });
  };

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
    setFilterStatus(test);

    setQuery({ ...query, status: test.toLowerCase() });
    // router.query.solved = test;

    if (!test) {
      removeQueryParamsFromRouter(router, ["status"]);
    } else {
      router.push(router);
    }
    // router.push(router);
  };
  const handleChange1 = (test: any) => {
    setFilterLevel(test);
    // router.query.level = test;
    console.log(router);
    setQuery({ ...query, level: test.toLowerCase() });

    if (!test) {
      removeQueryParamsFromRouter(router, ["level"]);
    } else {
      router.push(router);
    }
  };

  const handleChange2 = (test: any) => {
    setSearch(test);
    // router.query.search = test;

    setQuery({ ...query, search: test.toLowerCase() });

    if (!test) {
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

  const filteredItems = filterSolvedItems(items, filterStatus);
  const yay = filterLevelItems(filteredItems, filterLevel, router);

  const hj = filterSearch(yay, search, projectIdToLanguage);

  const arr = ["Error", "Warning", "Info"];
  const arr1 = ["Unresolved", "Resolved"];

  return (
    <>
      <FilterStyles>
        <Button2
          iconPosition="leading"
          icon="/icons/white-check.svg"
          variant="primary"
        >
          Resolve selected issues
        </Button2>
        <FilterYay>
          <Select
            handleSelect={(e: any) => handleChange(e)}
            options={["Unresolved", "Resolved"]}
            placeholder="Status"
          >
            {arr1.map((item: string) => {
              return (
                <SelectOption
                  handleSelect={(e: any) => handleChange(e)}
                  value={item}
                  key={item}
                >
                  {item}
                </SelectOption>
              );
            })}
          </Select>
          <Select
            handleSelect={(e: any) => handleChange1(e)}
            options={["Error", "Warning", "Info"]}
            placeholder="Level"
          >
            {arr.map((item: string) => {
              return (
                <SelectOption
                  value={item}
                  handleSelect={(e: any) => handleChange1(e)}
                  key={item}
                >
                  {item}
                </SelectOption>
              );
            })}
          </Select>
          <Input
            icon="/icons/search.svg"
            placeholder="Project Name"
            onChangee={(e: any) => handleChange2(e)}
          />
        </FilterYay>
      </FilterStyles>
      <Container>
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
    </>
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

  if (filter === "Error" || filter === "error") {
    test = items.filter((item: any) => item.level === "error");
  } else if (filter === "Warning" || filter === "warning") {
    test = items.filter((item: any) => item.level === "warning");
  } else if (filter === "Info" || filter === "info") {
    test = items.filter((item: any) => item.level === "info");
  } else {
    return items;
  }

  return test;
};

const filterSearch = (items: any, filter: any, projectIdToLanguage: any) => {
  let test;

  if (filter) {
    test = items.filter((item: Issue) => {
      return filter.toLowerCase() === ""
        ? item
        : projectIdToLanguage[item.projectId].includes(filter.toLowerCase());
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
