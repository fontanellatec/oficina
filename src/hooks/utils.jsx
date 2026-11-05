import React, { useState } from "react";

export const ToDate = (props) => {
    if (props.param != '' && props.param != null && props.param != undefined){
        return new Date(props.param + " 00:00:00").toLocaleDateString();
    }
    return ''
}

export function ToNumber(props) {
    let number = props.param
    let atualNumber = number.toLocaleString('pt-br',{currency: 'BRL'});
    return atualNumber
}




