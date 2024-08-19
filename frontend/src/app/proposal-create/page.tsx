'use client';

import {Input, Textarea, Select, SelectItem, Button} from "@nextui-org/react";

export default function ProposalCreate() {

  function createProposal(form: any){
    console.log("TEST:    ", form)
  }

  const tradingPhaseDurations = [
    { label: '5d'},
    { label: '2w'},
    { label: '1m'}
  ]

  const adoptionPhaseDurations = [
    { label: '1m'},
    { label: '6m'},
    { label: '1y'}
  ]

  return (
    <div className="w-2/4 mx-auto mb-36 mt-28">
      <div className="text-[32px] font-medium mb-14">
        New proposal
      </div>
      <form onSubmit={createProposal}>
        <Input className="pb-3" labelPlacement="outside" label="Title" placeholder=" ">
        </Input>
        <Textarea className="pb-16" labelPlacement="outside" label="Description" placeholder=" ">
        </Textarea>
        <Textarea className="pb-16" labelPlacement="outside" label="Success Criterion of the proposal" placeholder=" ">
        </Textarea>
        <Select
          items={tradingPhaseDurations}
          label="Trading phase duration"
          labelPlacement="outside"
          placeholder=" "
          className="pb-3"
        >
          {(tradingPhaseDuration) => <SelectItem key={tradingPhaseDuration.label} >{tradingPhaseDuration.label}</SelectItem>}
        </Select>
        <Select
          items={adoptionPhaseDurations}
          label="Adoption phase duration"
          labelPlacement="outside"
          placeholder=" "
          className="pb-16"
        >
          {(tradingPhaseDuration) => <SelectItem key={tradingPhaseDuration.label} >{tradingPhaseDuration.label}</SelectItem>}
        </Select>
        <Input labelPlacement="outside" label="External link" placeholder=" ">
        </Input>
        <div className="flex justify-end mt-8">
          <Button type="submit" color="primary" variant="ghost">Submit</Button>
        </div>
      </form>
    </div>
  );
}
