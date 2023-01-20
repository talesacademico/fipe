import styled from "styled-components";

export const ContentSelect = styled.div`

margin-top: 20px;
display: flex;
margin: 10px;
select{
    width: 100%;
    min-width: 20rem;
    border: 1px solid #ccc;
    border-radius: 0.25em;
    padding: 0.25em 0.5em;
    font-size: 1.25rem;
    cursor: pointer;
    line-height: 1.1;
    background-color: #fff;
    option:first-child{
      background-color: aqua;
     }
}

  label{
    font-size: 1.2rem;
    font-weight: 600;
    color: black;
  }

`