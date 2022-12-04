import styled from "styled-components";
import { CSSProperties } from "react";
import { ProjectCard } from "../project-card";
import { useProjects } from "../../api/use-projects";
import { breakpoint, space } from "@styles/theme";
import ClipLoader from "react-spinners/ClipLoader";

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: ${space(6)};

  // reset list styles
  list-style: none;
  padding: 0;
  margin: 0;

  @media (min-width: ${breakpoint("desktop")}) {
    grid-template-columns: repeat(auto-fit, 400px);
  }
`;

const override: CSSProperties = {
  display: "block",
  margin: "129px auto",
  // borderColor: "#7F56D9",
  color: "#7F56D9",
};

export function ProjectList() {
  const { data, isLoading, isError, error } = useProjects();

  if (isLoading) {
    return (
      <ClipLoader
        cssOverride={override}
        size={58}
        // aria-label="Loading Spinner"
      />
    );
  }

  if (isError) {
    console.error(error);
    return <div>Error: {error.message}</div>;
  }

  console.log(data);

  return (
    <List>
      {data?.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </List>
  );
}
