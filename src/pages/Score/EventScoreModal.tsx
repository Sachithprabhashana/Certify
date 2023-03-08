import React, {FC, useRef} from "react";
import {Button, Modal} from "antd";
import {ScorePrintPreview} from "./ScorePrintPreview";
import {useReactToPrint} from "react-to-print";

type Props = {
    visible:boolean;
    setVisible: (value:boolean)=> void;
    data:any;
    total:any;
}
export const EventScoreModal:FC <Props> = ({visible,setVisible,data,total})=> {

    const printPreviewRef = useRef<any>();
    const handlePrint = useReactToPrint({
        content: () => printPreviewRef.current,
        pageStyle: ' @page { size: A4 portrait; margin: 5;}',
    });
    return(
        <Modal  footer={<Button onClick={handlePrint} type="primary" style={{ fontSize: 15, width: '100px', height: '30px' }} >print</Button>} open={visible} title={'Scores'} width={'80vw'} onCancel={()=>setVisible(false)}>
            <div ref={printPreviewRef}>
            <ScorePrintPreview total={total} data={data} />
            </div>
        </Modal>
    )
}
