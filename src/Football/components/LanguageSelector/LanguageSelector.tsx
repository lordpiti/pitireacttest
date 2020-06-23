import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Flag from 'react-world-flags';
import { useTranslation } from 'react-i18next';

//https://www.ankursheel.com/blog/custom-type-definitions-for-java-script-dependencies
const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const LanguageSelector = (props: any) => {
  const classes = useStyles();
  const [age, setAge] = useState('en');
  const handleChange = (event: any) => {
    setAge(event.target.value);
    i18n.changeLanguage('es');
  };
  const { t, i18n } = useTranslation();

  return (
    <div>
      <FormControl className={classes.formControl}>
        {/* <InputLabel id='demo-simple-select-label'>{t('language')}</InputLabel> */}
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={'es'}>
            <Flag code={'ES'} height='12' /> Spanish
          </MenuItem>
          <MenuItem value={'en'}>
            <Flag code={'GB'} height='12' /> English
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default LanguageSelector;
