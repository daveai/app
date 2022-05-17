import { useFormContext } from 'react-hook-form';
import { Button } from 'rebass';
import styled from 'styled-components';
import { NimiSignatureColor, WhiteCard } from '../../../theme';
import { Button as NimiButton } from '../../Button';
import { InputForm } from './InputForm';
import { ProfilePic } from './ProfilePic';

const StyledCard = styled(WhiteCard)`
  padding: 42px;
  display: flex;
  max-width: 560px;
`;
const TitleText = styled.div`
  ${NimiSignatureColor}
  font-size: 46px;
  line-height: 116%;

  text-align: start;
`;
const NameTag = styled.span`
  text-transform: capitalize;
  font-weight: 700;
`;
const StyledButton = styled(Button)`
  margin-top: 42px;
  background: #56ccf2;
  box-shadow: 0px 10px 32px -48px rgba(52, 55, 100, 0.08);
  border-radius: 30px !important;
  padding: 10px 24px;
`;
const AddField = styled.button`
  border-radius: 12px;
  padding: 12px 16px;
  width: 100%;
  margin-top: 28px;
  ${NimiSignatureColor};
  border: 2px dotted rgba(67, 104, 234, 1);
`;
const StyledButtonPrimary = styled(NimiButton)`
  width: 100%;
  margin-top: 32px;
`;

export function Input({ setModalState, ensName, inputFields }) {
  const { handleSubmit } = useFormContext();
  const onSubmit = (data, e) => console.log(data, e);
  const onError = (errors, e) => console.log(errors, e);
  return (
    <StyledCard as="form" onSubmit={handleSubmit(onSubmit, onError)}>
      <TitleText>
        Creating <NameTag>{ensName.split('.')[0]}&apos;s</NameTag> Personal Nimi site.
      </TitleText>
      <ProfilePic />
      <StyledButton marginBottom="28px">Import Data from Twitter</StyledButton>

      <InputForm inputFields={inputFields} />
      <AddField onClick={() => setModalState(true)}>+ ADD FIELDS</AddField>
      <StyledButtonPrimary type="submit">Save &amp; Deploy Nimi Site </StyledButtonPrimary>
    </StyledCard>
  );
}