import React, { ForwardRefRenderFunction, ReactNode, useImperativeHandle, useState } from 'react';
import {Modal, Spin} from 'antd';
import { CertificateDto } from '../../Dto/Certificate.dto';
import {NoSsr} from "./NoSsr";
import { PDFViewer } from '@react-pdf/renderer';
import {Certificate} from "./Certificate";

export type CertificateModalInstance = {
  show: (value: CertificateDto) => void;
};
type Props = {
  title?: string;
};
const CertificateModal: ForwardRefRenderFunction<CertificateModalInstance, Props> = (
  props,
  ref,
) => {
  useImperativeHandle(
    ref,
    () => ({
      show: (value) => {
        console.log(value);
        setVisible(true);
      },
    }),
    [],
  );
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <Modal  footer={null} open={visible} title={'Certificates'} width={'100vw'} onCancel={() =>setVisible(false)}>
        <div style={{ height: 'calc(100vh - 210px)', margin: -20 }}>
        <NoSsr fallback={<Spin spinning={true} />}>
            <PDFViewer width={'100%'} height={'100%'}>
                <Certificate />
            </PDFViewer>
        </NoSsr>
        </div>
    </Modal>
  );
};
export default React.forwardRef<CertificateModalInstance, Props>(CertificateModal);
