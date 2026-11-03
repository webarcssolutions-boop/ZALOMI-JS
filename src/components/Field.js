import React, { useState } from 'react';
import { View, TextInput, Platform, ScrollView } from 'react-native';
import { COLORS, FONT, TYPOGRAPHY_SCALE } from '../theme/theme';
import { T, Icon, Press } from '../theme/ui';

/** Input with the label printed inside the box (as in the Contact design) */
export function Field({ label, value, onChangeText, multiline, keyboardType, autoCapitalize, secure, error, style, minH }) {
  return (
    <View style={style}>
      <View style={{ borderWidth: 1, borderColor: error ? COLORS.red : '#0F3C57', borderRadius: 4, backgroundColor: '#FFFDF7', paddingHorizontal: 12, paddingTop: 8, paddingBottom: multiline ? 10 : 6, minHeight: minH }}>
        <T w="b" size={12.5} color="#0F3C57" lh={18}>{label}</T>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secure}
          style={[{ fontFamily: FONT.m, fontSize: 15 * TYPOGRAPHY_SCALE, color: COLORS.ink, paddingVertical: 4, minHeight: multiline ? (minH || 90) - 36 : 26, textAlignVertical: multiline ? 'top' : 'center' }, Platform.OS === 'web' ? { outlineStyle: 'none' } : null]}
        />
      </View>
      {error ? <T w="m" size={11.5} color={COLORS.red} style={{ marginTop: 4 }}>{error}</T> : null}
    </View>
  );
}

/** Simple dropdown that looks like a Field */
export function SelectField({ label, value, options, onChange, style }) {
  const [open, setOpen] = useState(false);
  const current = options.find((o) => o.value === value);
  return (
    <View style={[{ zIndex: open ? 20 : 1 }, style]}>
      <Press onPress={() => setOpen(!open)} style={{ borderWidth: 1, borderColor: '#0F3C57', borderRadius: 4, backgroundColor: '#FFFDF7', paddingHorizontal: 12, paddingTop: 8, paddingBottom: 6, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <T w="b" size={12.5} color="#0F3C57" lh={18}>{label}</T>
          <T w="m" size={15} color={current ? COLORS.ink : COLORS.muted} style={{ paddingVertical: 4 }}>{current ? current.label : 'Select'}</T>
        </View>
        <Icon name={open ? 'chevron-up' : 'chevron-down'} size={22} color="#0F3C57" />
      </Press>
      {open ? (
        <View style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, backgroundColor: '#fff', borderRadius: 6, borderWidth: 1, borderColor: COLORS.sky,
          shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 14, elevation: 8, overflow: 'hidden' }}>
          <ScrollView style={{ maxHeight: 260 }} nestedScrollEnabled>
            {options.map((o) => (
              <Press key={o.value} onPress={() => { onChange(o.value); setOpen(false); }} hoverStyle={{ backgroundColor: COLORS.skyLight }} style={{ paddingHorizontal: 14, paddingVertical: 10 }}>
                <T w={o.value === value ? 'b' : 'm'} size={14}>{o.label}</T>
              </Press>
            ))}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
}
