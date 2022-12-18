import styled from "styled-components";
import capitalize from "lodash/capitalize";
import { color, space, textFont } from "@styles/theme";
import { Badge, BadgeColor, BadgeSize } from "@features/ui";
import { IssueLevel } from "../../types/issue.types";
import { ProjectLanguage } from "@features/projects";
import type { Issue } from "../../types/issue.types";

type IssueRowProps = {
  projectLanguage: ProjectLanguage;
  issue: Issue;
};

const levelColors = {
  [IssueLevel.info]: BadgeColor.success,
  [IssueLevel.warning]: BadgeColor.warning,
  [IssueLevel.error]: BadgeColor.error,
};

const Row = styled.div`
  display: table-row;
  &:nth-child(2n) {
    background: ${color("gray", 50)};
  }

  @media (max-width: 750px) {
    display: flex;
    border: 1px solid #e4e7ec;
    /* Shadow/sm */
    flex-wrap: wrap;
    justify-content: center;
    box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
      0px 1px 2px rgba(16, 24, 40, 0.06);
    border-radius: 8px;
    margin-top: 16px;
  }
`;

const MobileCellHeader = styled.span`
  display: none;

  @media (max-width: 750px) {
    display: flex;
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    /* identical to box height, or 143% */

    /* Gray/500 */

    color: #667085;
  }
`;

const Cell = styled.div`
  display: table-cell;
  padding: ${space(4, 6)};
  color: ${color("gray", 500)};
  ${textFont("sm", "regular")}

  @media (max-width: 750px) {
    display: flex;

    align-items: center;

    &:not(:first-child) {
      flex-direction: column;
    }
  }
`;

const IssueCell = styled(Cell)`
  display: flex;
  align-items: center;
`;

const LanguageIcon = styled.img`
  width: ${space(10)};
  margin-right: ${space(3)};
`;

const ErrorTypeAndMessage = styled.div`
  color: ${color("gray", 900)};
`;

const ErrorType = styled.span`
  ${textFont("sm", "medium")}
`;

export function IssueRow({ projectLanguage, issue }: IssueRowProps) {
  const { name, message, stack, level, numEvents, numUsers } = issue;
  const firstLineOfStackTrace = stack.split("\n")[1];
  return (
    <Row>
      <IssueCell>
        <LanguageIcon
          src={`/icons/${projectLanguage}.svg`}
          alt={projectLanguage}
        />
        <div>
          <ErrorTypeAndMessage>
            <ErrorType>{name}:&nbsp;</ErrorType>
            {message}
          </ErrorTypeAndMessage>
          <div>{firstLineOfStackTrace}</div>
        </div>
      </IssueCell>
      <Cell>
        <MobileCellHeader>Status</MobileCellHeader>
        <Badge color={levelColors[level]} size={BadgeSize.sm}>
          {capitalize(level)}
        </Badge>
      </Cell>
      <Cell>
        <MobileCellHeader>Events</MobileCellHeader>
        {numEvents}
      </Cell>
      <Cell>
        <MobileCellHeader>Users</MobileCellHeader>
        {numUsers}
      </Cell>
    </Row>
  );
}
