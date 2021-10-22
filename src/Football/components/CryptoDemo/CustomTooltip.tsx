const CustomTooltip = (props: any) => {
  debugger;
  if (props.active && props.payload && props.payload.length) {
    return (
      <div>
        <p>HAHA</p>
        <p className='tooltipLabel'>{`$${props.payload[0].payload?.price}`}</p>
        <p className='tooltipDesc'>{`${props.payload[0]?.payload?.date}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
