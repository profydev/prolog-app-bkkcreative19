/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import { CSSProperties } from "react";
import { ProjectCard } from "../project-card";
import { useProjects } from "../../api/use-projects";
import { breakpoint, space, color, textFont } from "@styles/theme";
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

const ErrorContainer = styled.div`
  background: ${color("error", 25)};
  border: 1px solid ${color("error", 300)};
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: ${space(1, 4)};
  ${textFont("md", "medium")}
`;

const ErrorMessage = styled.p`
  color: ${color("error", 700)};
  margin-left: ${space(3)};
`;

const TryAgain = styled.div`
  color: ${color("error", 700)};
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 8px;
`;

const override: CSSProperties = {
  display: "block",
  margin: "129px auto",
  color: "#7F56D9",
};

export function ProjectList() {
  const { data, isLoading, isError, error } = useProjects();
  if (isLoading) {
    return (
      <ClipLoader
        cssOverride={override}
        size={58}
        aria-label="Loading Spinner"
      />
    );
  }

  if (isError) {
    return (
      <ErrorContainer>
        <img src="/icons/error.svg" alt="error" />
        <ErrorMessage>
          There was a problem while loading the project data
        </ErrorMessage>
        <TryAgain>
          Try again
          <img src="/icons/arrow-right.svg" alt="right-arrow" />
        </TryAgain>
      </ErrorContainer>
    );
  }

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
