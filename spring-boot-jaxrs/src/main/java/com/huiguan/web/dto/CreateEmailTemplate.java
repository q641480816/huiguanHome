package com.huiguan.web.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateEmailTemplate {
    String nameChinese;
    String nameEnglish;
    String nric;
    String dateOfBirth;
    String homeTel;
    String sex;
    String placeOfBirth;
    String officeTel;
    String occupation;
    String nationality;
    String hp;
    String email;
    String origin;
    String education;
    String homeAddress;
    String officeAddress;
    String otherClubs;
    Beneficiary[] beneficiaries;
    String introducedBy;
    transient String image;
    // creationTime is auto generated.
    String creationTime;
}
