import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Flag from 'react-world-flags';
import { useTranslation } from 'react-i18next';
import './LanguageSelector.scss';

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
  const [currentLanguage, setLanguage] = useState('en');
  const handleChange = (event: any) => {
    setLanguage(event.target.value);
    i18n.changeLanguage(event.target.value);
  };
  const { t, i18n } = useTranslation();

  return (
    <div>
      <FormControl className={classes.formControl}>
        {/* <InputLabel id='demo-simple-select-label'>{t('language')}</InputLabel> */}
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={currentLanguage}
          onChange={handleChange}
        >
          <MenuItem value={'es'}>
            <div className='menuItemLanguage'>
              <Flag code={'ES'} height='12' />{' '}
              <span>{t('common.languages.spanish')}</span>
            </div>
          </MenuItem>
          <MenuItem value={'en'}>
            <div className='menuItemLanguage'>
              <Flag code={'GB'} height='12' />{' '}
              <span>{t('common.languages.english')}</span>
            </div>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default LanguageSelector;
